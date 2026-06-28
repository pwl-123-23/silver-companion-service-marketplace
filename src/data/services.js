import heroScene from "../assets/images/hero-companion.jpg";
import dailyScene from "../assets/images/service-daily-v2.jpg";
import emotionalScene from "../assets/images/service-emotional-v2.jpg";
import hobbyDetailScene from "../assets/images/service-hobby.jpg";
import hobbyScene from "../assets/images/service-hobby-v2.jpg";
import homeCleaningScene from "../assets/images/service-home-cleaning-v3.jpg";
import memoryReadingScene from "../assets/images/service-memory-reading-v3.jpg";
import musicTeaScene from "../assets/images/service-music-tea-v3.jpg";
import outdoorScene from "../assets/images/service-outdoor-v2.jpg";
import parkWalkScene from "../assets/images/service-park-walk-v3.jpg";

export const categoryImages = {
  emotional: emotionalScene,
  daily: dailyScene,
  outdoor: outdoorScene,
  hobby: hobbyScene,
};

export const categories = [
  {
    id: "all",
    label: "全部服务",
    description: "浏览所有陪护与协助服务",
    image: heroScene,
  },
  {
    id: "emotional",
    label: "情感陪伴",
    description: "陪聊、倾听与日常关怀",
    image: emotionalScene,
  },
  {
    id: "daily",
    label: "日常协助",
    description: "采购、代办与轻家务支持",
    image: dailyScene,
  },
  {
    id: "outdoor",
    label: "外出陪同",
    description: "就医、散步与办事陪同",
    image: outdoorScene,
  },
  {
    id: "hobby",
    label: "兴趣陪伴",
    description: "音乐、阅读、园艺与手作",
    image: hobbyScene,
  },
];

export const services = [
  {
    id: 1,
    title: "温暖陪聊探访",
    category: "emotional",
    description:
      "耐心陪伴长者聊天、倾听近况，提供轻松、稳定的日常情感支持。",
    pricePerHour: 60,
    rating: 4.9,
    image: emotionalScene,
    badge: "人气陪伴",
  },
  {
    id: 2,
    title: "回忆阅读陪伴",
    category: "emotional",
    description:
      "一起阅读、翻看相册、讲述往事，用温和方式唤起有意义的记忆。",
    pricePerHour: 68,
    rating: 4.8,
    image: memoryReadingScene,
    badge: "情绪关怀",
  },
  {
    id: 3,
    title: "代买代办助手",
    category: "daily",
    description:
      "协助超市采购、药店取药、排队办理，以及附近小件日常事务。",
    pricePerHour: 35,
    rating: 4.7,
    image: dailyScene,
    badge: "生活代办",
  },
  {
    id: 4,
    title: "轻家务协助",
    category: "daily",
    description:
      "协助居家拖地、擦拭、简单整理与日常安全提醒，让生活环境更清爽。",
    pricePerHour: 45,
    rating: 4.8,
    image: homeCleaningScene,
    badge: "居家支持",
  },
  {
    id: 5,
    title: "就医陪同",
    category: "outdoor",
    description:
      "提供预约到院、挂号签到、排队沟通与就诊过程中的安心陪伴。",
    pricePerHour: 100,
    rating: 4.9,
    image: outdoorScene,
    badge: "安心就医",
  },
  {
    id: 6,
    title: "社区散步陪伴",
    category: "outdoor",
    description:
      "陪同小区或公园慢走，安排湖边休息点和简单器械活动，关注步行节奏。",
    pricePerHour: 50,
    rating: 4.6,
    image: parkWalkScene,
    badge: "户外陪同",
  },
  {
    id: 7,
    title: "音乐下午茶",
    category: "hobby",
    description:
      "一起听黑胶和熟悉歌曲，搭配茶咖啡、桃酥与小蛋糕，享受轻松下午茶。",
    pricePerHour: 70,
    rating: 4.8,
    image: musicTeaScene,
    badge: "兴趣疗愈",
  },
  {
    id: 8,
    title: "园艺手作陪伴",
    category: "hobby",
    description:
      "陪伴进行轻松园艺、纸艺手作或桌面活动，节奏按长者状态调整。",
    pricePerHour: 75,
    rating: 4.7,
    image: hobbyDetailScene,
    badge: "手作陪伴",
  },
];
