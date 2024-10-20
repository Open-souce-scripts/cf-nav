/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

/**
 *  自定义网站配置
 */
const config = {
	title: "无忧出海导航",                 //write your website title
	subtitle: "Cloudflare Workers Dir", //write your website subtitle
	logo_icon: "sitemap",               //select your logo by semantic-ui icon (you can get more msg in:https://semantic-ui.com/elements/icon.html)
	hitokoto: true,                     //use hitokoto or not
	search:true,                        //enable search function
	search_engine:[                     //choose search engine which you use
	  {
		name:"秘塔 AI",
		template:"https://metaso.cn/?q=%s"
	  },
	  {
		name:"谷 歌",
		template:"https://www.google.com/search?q=$s"
	  },
	  {
		name:"必 应",
		template:"https://www.bing.com/search?q=$s"
	  },
	  {
		name:"搜 狗",
		template:"https://www.sogou.com/web?query=$s"
	  }
	],
	selling_ads: true,                  //Selling your domain or not.(turning on may be helpful for selling this domain by showing some ads.)
	sell_info:{
	  domain:"example.com",
	  price:500,                        //domain price
	  mon_unit:"yen sign",              //monetary unit
	  contact:[                         //how to contact you
		{
		  type:"envelope",               //contact type ("weixin","qq","telegram plane","envelope" or "phone")
		  content:"info@example.com"
		}
	  ]
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
  }
  const el = (tag, attrs, content) => `<${tag} ${attrs.join(" ")}>${content}</${tag}>`;

  async function handleRequest(request) {
	const init = {
	  headers: {
		'content-type': 'text/html;charset=UTF-8',
	  },
	}
	return new Response(renderHTML(renderIndex(),config.selling_ads? renderSeller() :null), init);
  }
  addEventListener('fetch', event => {
	return event.respondWith(handleRequest(event.request))
  })

  /*通过分析链接 实时获取favicon
  * @url 需要分析的Url地址
  */
  function getFavicon(url) {
	const domain = url.replace(/^https?:\/\//, '').split('/')[0];
	return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  }

  /** Render Functions
   *  渲染模块函数
   */

  function renderIndex(){
	const footer = el('footer',[],el('div',['class="footer"'],'Powered by' + el('a',['class="ui label"','href="https://github.com/Open-souce-scripts/cf-nav"','target="_blank"'],el('i',['class="github icon"'],"") + 'Cf-Nav') + ' &copy; Base on ' + el('a',['class="ui label"'],el('i',['class="balance scale icon"'],"") + 'MIT License')));
	return renderHeader() + renderMain() + footer;
  }

  function renderHeader(){
	const item = (template,name) => el('a',['class="item"',`data-url="${template}"`],name);

	var nav = el('div',['class="ui large secondary inverted menu"'],el('div',['class="item"'],el('p',['id="hitokoto"'],'条条大路通罗马')))
	var title = el('h1',['class="ui inverted header"'],el('i',[`class="${config.logo_icon} icon"`],"") + el('div',['class="content"'],config.title + el('div',['class="sub header"'],config.subtitle)));
	var menu = el('div',['id="sengine"','class="ui bottom attached tabular inverted secondary menu"'],el('div',['class="header item"'],'&nbsp;') + config.search_engine.map((link,key) =>{
	  if(key == 0){
		return el('a',['class="active item"',`data-url="${link.template}"`],link.name);
	  }else{
		return item(link.template,link.name);
	  }
	}).join(""))
	var input = el('div',['class="ui left corner labeled right icon fluid large input"'],el('div',['class="ui left corner label"'],el('img',['id="search-fav"','class="left floated avatar ui image"','src="https://metaso.cn/favicon.ico"'],"")) + el('input',['id="searchinput"','type="search"','placeholder="搜索你想要知道的……"','autocomplete="off"'],"") + el('i',['class="inverted circular search link icon"'],""));
	return el('header',[],el('div',['id="head"','class="ui inverted vertical masthead center aligned segment"'],(config.hitokoto ? el('div',['id="nav"','class="ui container"'],nav) : "") + el('div',['id="title"','class="ui text container"'],title + (config.search ? input + menu :"") + `${config.selling_ads ? '<div><a id="menubtn" class="red ui icon inverted button"><i class="heart icon"></i> 喜欢此域名 </a></div>' : ''}`)))
  }

  function renderMain() {
	var main = config.lists.map((item) => {
	  const card = (url,name,desc)=> el('a',['class="card"',`href=${url}`,'target="_blank"'],el('div',['class="content"'],el('img',['class="left floated avatar ui image"',`src=${getFavicon(url)}`],"") + el('div',['class="header"'],name) + el('div',['class="meta"'],desc)));
	  const divider = el('h4',['class="ui horizontal divider header"'],el('i',[`class="${item.icon} icon"`],"")+item.name);

	  var content = el('div',['class="ui four stackable cards"'],item.list.map((link) =>{
		return card(link.url,link.name,link.desc);
	  }).join(""));

	  return el('div',['class="ui basic segment"'],divider + content);
	}).join("");

	return el('main',[],el('div',['class="ui container"'],main));
  }

  function renderSeller() {
	const item = (type,content) => el('div',['class="item"'],el('i',[`class="${type} icon"`],"") + el('div',['class="content"'],content));
	var title = el('h1',['class="ui yellow dividing header"'],el('i',['class="gem outline icon"'],"") + el('div',['class="content"'],config.sell_info.domain + ' 正在出售'));
	var action = el('div',['class="actions"'],el('div',['class="ui basic cancel inverted button"'],el('i',['class="reply icon"'],"") + '返回'));

	var contact = config.sell_info.contact.map((list) => {
	  return item(list.type,list.content);
	}).join("");
	var column = el('div',['class="column"'],el('h3',['class="ui center aligned icon inverted header"'],el('i',['class="circular envelope open outline grey inverted icon"'],"") + '联系我') + el('div',['class="ui relaxed celled large list"'],contact));
	var price = el('div',['class="column"'],el('div',['class="ui large yellow statistic"'],el('div',['class="value"'],el('i',[`class="${config.sell_info.mon_unit} icon"`],"") + config.sell_info.price)));
	var content = el('div',['class="content"'],el('div',['class="ui basic segment"'],el('div',['class="ui two column stackable center aligned grid"'],el('div',['class="ui inverted vertical divider"'],'感兴趣？') + el('div',['class="middle aligned row"'],price + column))));

	return el('div',['id="seller"','class="ui basic modal"'],title + content + action);
  }

  function renderHTML(index,seller) {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>${config.title} - ${config.subtitle}</title>
		<link href="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.css" rel="stylesheet">
		<link href="https://cdn.jsdelivr.net/gh/Open-souce-scripts/cf-nav@main/src/style.css" rel="stylesheet">
		<script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.js"></script>
	</head>
	<body>
	  ${index}
	  ${config.selling_ads ? seller : ''}
	  <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
	  <script>
		$('#sengine a').on('click', function (e) {
		  $('#sengine a.active').toggleClass('active');
		  $(e.target).toggleClass('active');
		  $('#search-fav').attr('src',$(e.target).data('url').match(`+/https{0,1}:\/\/\S+\//+`)[0] + '/favicon.ico') ;
		});
		$('.search').on('click', function (e) {
			var url = $('#sengine a.active').data('url');
			url = url.replace(`+/\$s/+`,$('#searchinput').val());
			window.open(url);
		});
		/* 鼠标聚焦时，回车事件 */
		$("#searchinput").bind("keypress", function(){
			if (event.keyCode == 13){
			// 触发需要调用的方法
			$(".search").click();
			}
		});
		$('#menubtn').on('click', function (e) {
			$('#seller').modal('show');
		});
	  </script>
	</body>

	</html>`
  }

