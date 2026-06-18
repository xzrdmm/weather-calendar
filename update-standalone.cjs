const fs = require('fs');

// Read TS city data and convert to compact JS
const tsCities = fs.readFileSync('src/data/cities.ts', 'utf8');
const cityMatches = [...tsCities.matchAll(/{ name: '([^']+)', latitude: ([0-9.]+), longitude: ([0-9.]+) }/g)];
const cityJS = 'const CITIES=[' + cityMatches.map(m =>
  '{n:"' + m[1] + '",a:' + m[2] + ',o:' + m[3] + '}'
).join(',') + '];';
console.log('Cities extracted:', cityMatches.length);

// Traditional holidays compact data
const TRAD_2020_2030 = {
2020:'0101-元旦,0124-除夕,0125-春节,0208-元宵,0404-清明,0501-劳动,0625-端午,0825-七夕,1001-中秋·国庆,1002-国庆,1003-国庆,1025-重阳',
2021:'0101-元旦,0211-除夕,0212-春节,0226-元宵,0404-清明,0501-劳动,0614-端午,0814-七夕,0921-中秋,1001-国庆,1002-国庆,1003-国庆,1014-重阳',
2022:'0101-元旦,0131-除夕,0201-春节,0215-元宵,0405-清明,0501-劳动,0603-端午,0804-七夕,0910-中秋,1001-国庆,1002-国庆,1003-国庆,1004-重阳',
2023:'0101-元旦,0121-除夕,0122-春节,0205-元宵,0405-清明,0501-劳动,0622-端午,0822-七夕,0929-中秋,1001-国庆,1002-国庆,1003-国庆,1023-重阳',
2024:'0101-元旦,0209-除夕,0210-春节,0224-元宵,0404-清明,0501-劳动,0610-端午,0810-七夕,0917-中秋,1001-国庆,1002-国庆,1003-国庆,1011-重阳',
2025:'0101-元旦,0128-除夕,0129-春节,0212-元宵,0404-清明,0501-劳动,0531-端午,0829-七夕,1001-国庆,1002-国庆,1003-国庆,1006-中秋,1029-重阳',
2026:'0101-元旦,0216-除夕,0217-春节,0303-元宵,0405-清明,0501-劳动,0619-端午,0819-七夕,0925-中秋,1001-国庆,1002-国庆,1003-国庆,1018-重阳',
2027:'0101-元旦,0205-除夕,0206-春节,0220-元宵,0405-清明,0501-劳动,0609-端午,0808-七夕,0915-中秋,1001-国庆,1002-国庆,1003-国庆,1008-重阳',
2028:'0101-元旦,0125-除夕,0126-春节,0209-元宵,0404-清明,0501-劳动,0528-端午,0826-七夕,1001-国庆,1002-国庆,1003-中秋·国庆,1026-重阳',
2029:'0101-元旦,0212-除夕,0213-春节,0227-元宵,0404-清明,0501-劳动,0616-端午,0814-七夕,0922-中秋,1001-国庆,1002-国庆,1003-国庆,1016-重阳',
2030:'0101-元旦,0202-除夕,0203-春节,0217-元宵,0405-清明,0501-劳动,0605-端午,0805-七夕,0912-中秋,1001-国庆,1002-国庆,1003-国庆,1005-重阳,1231-除夕'
};

const tradLookupJS = 'const TRAD_HOLS=' + JSON.stringify(TRAD_2020_2030) +
';function getTradHoliday(ds){var p=ds.split("-");var y=p[0];var k=p[1]+p[2];var e=TRAD_HOLS[y];if(!e)return null;var f=e.split(",").find(function(x){return x.startsWith(k)});if(!f)return null;var nm=f.split("-")[1];return{d:ds,t:"holiday",n:nm};}';

let html = fs.readFileSync('standalone.html', 'utf8');

// Replace CITIES array
html = html.replace(/const CITIES=\[[^\]]+\];/, cityJS);

// Inject traditional holidays after HOLIDAY_DATA comment
html = html.replace('// ============ API & UTILS ============',
  '// ============ TRAD HOLIDAYS ============\n' + tradLookupJS + '\n\n// ============ API & UTILS ============');

// Update getHoliday to check traditional holidays too
html = html.replace(
  'function getHoliday(ds){if(state.holidayMap&&state.holidayMap[ds])return state.holidayMap[ds];return HOLIDAY_DATA[ds];}',
  'function getHoliday(ds){if(state.holidayMap&&state.holidayMap[ds])return state.holidayMap[ds];if(HOLIDAY_DATA[ds])return HOLIDAY_DATA[ds];var t=getTradHoliday(ds);if(t)return t;return null;}'
);

fs.writeFileSync('standalone.html', html, 'utf8');
console.log('standalone.html updated successfully');
