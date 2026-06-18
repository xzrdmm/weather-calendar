import type { ClothingAdvice } from '../types'

// 根据温度、湿度、风力、降水生成穿衣建议
export function getClothingAdvice(
  tempMax: number,
  tempMin: number,
  humidity: number,
  windSpeed: number,
  precipitation: number,
): ClothingAdvice {
  const avgTemp = (tempMax + tempMin) / 2

  // 基础温度建议
  let icon: string
  let text: string
  const extras: string[] = []

  if (avgTemp > 35) {
    icon = '🩳'
    text = '短袖短裤，注意防晒'
    extras.push('戴遮阳帽', '涂抹防晒霜')
  } else if (avgTemp > 28) {
    icon = '👕'
    text = '短袖，轻薄透气'
  } else if (avgTemp > 20) {
    icon = '👔'
    text = '薄长袖 / 衬衫'
  } else if (avgTemp > 12) {
    icon = '🧥'
    text = '薄外套 + 长裤'
  } else if (avgTemp > 5) {
    icon = '🧥'
    text = '厚外套 / 毛衣'
  } else if (avgTemp > -5) {
    icon = '🧣'
    text = '羽绒服 / 棉服'
  } else {
    icon = '🧤'
    text = '最厚冬装，围巾手套'
  }

  // 温差大提示
  if (tempMax - tempMin > 12) {
    extras.push('昼夜温差大，注意增减衣物')
  }

  // 湿度 + 降水修正
  if (precipitation > 0.5) {
    extras.push('带伞 ☔')
    if (avgTemp < 15) {
      extras.push('穿防水外套')
    }
  } else if (humidity > 85) {
    extras.push('湿度较大，注意防潮')
  }

  // 风力修正
  if (windSpeed > 40) {
    extras.push('风力较强，穿防风外套 🍃')
  }

  return {
    icon,
    text,
    detail: extras.length > 0 ? extras.join(' · ') : '天气舒适，祝您愉快 ☀️',
  }
}
