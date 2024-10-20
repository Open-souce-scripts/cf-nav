/**
 *  自定义网站配置 
 */
// config.js
export const config = {
    title: "无忧出海导航",
    subtitle: "51Seagoing Nav",
    logo_icon: "sitemap",
    hitokoto: true,
    search: true,
    search_engine: [
      { name: "秘塔 AI", template: "https://metaso.cn/?q=%s" },
      { name: "谷 歌", template: "https://www.google.com/search?q=$s" },
      { name: "必 应", template: "https://www.bing.com/search?q=$s" },
      { name: "搜 狗", template: "https://www.sogou.com/web?query=$s" }
    ],
    selling_ads: true,
    sell_info: {
      domain: "example.com",
      price: 500,
      mon_unit: "yen sign",
      contact: [{ type: "envelope", content: "mail@51seagoing.com" }]
    },
    lists: [
      {
        name: "domain",
        icon: "code",
        list: [
          { url: "https://www.namesilo.com/", name: "namesilo", desc: "支持支付宝" },
          { url: "https://www.namecheap.com/", name: "namecheap", desc: "经常搞活动" },
          { url: "https://www.spaceship.com/", name: "spaceship", desc: "价格便宜可以用卷" },
          { url: "https://porkbun.com/", name: "porkbun", desc: "价格实惠" }
        ]
      },
      {
        name: "vps",
        icon: "database",
        list: [
          { url: "https://hostloc.com/", name: "全球主机交流", desc: "主机物料交流集中地" },
          { url: "https://www.interserver.net/r/1003655", name: "interserver", desc: "性价比极稿的vps提供商" },
          { url: "https://www.vultr.com/", name: "vultr", desc: "按小时收费丰简由人" },
          { url: "https://bandwagonhost.com/", name: "搬瓦工", desc: "最牛逼的vps提供商，懂得都懂！" }
        ]
      }
    ]
  };