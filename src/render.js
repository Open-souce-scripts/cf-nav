import { config } from './config.js';

const el = (tag, attrs, content) => `<${tag} ${attrs.join(" ")}>${content}</${tag}>`;

export function renderIndex() {
  const footer = el('footer', [], el('div', ['class="footer"'], 'Powered by' + el('a', ['class="ui label"', 'href="https://github.com/sleepwood/cf-worker-dir"', 'target="_blank"'], el('i', ['class="github icon"'], "") + 'Cf-Worker-Dir') + ' &copy; Base on ' + el('a', ['class="ui label"'], el('i', ['class="balance scale icon"'], "") + 'MIT License')));
  return renderHeader() + renderMain() + footer;
}

export function renderHeader() {
  const item = (template, name) => el('a', ['class="item"', `data-url="${template}"`], name);

  const nav = el('div', ['class="ui large secondary inverted menu"'], el('div', ['class="item"'], el('p', ['id="hitokoto"'], '条条大路通罗马')));
  const title = el('h1', ['class="ui inverted header"'], el('i', [`class="${config.logo_icon} icon"`], "") + el('div', ['class="content"'], config.title + el('div', ['class="sub header"'], config.subtitle)));
  const menu = el('div', ['id="sengine"', 'class="ui bottom attached tabular inverted secondary menu"'], el('div', ['class="header item"'], '&nbsp;') + config.search_engine.map((link, key) => {
    return key === 0 ? el('a', ['class="active item"', `data-url="${link.template}"`], link.name) : item(link.template, link.name);
  }).join(""));
  const input = el('div', ['class="ui left corner labeled right icon fluid large input"'], el('div', ['class="ui left corner label"'], el('img', ['id="search-fav"', 'class="left floated avatar ui image"', 'src="https://metaso.cn/favicon.ico"'], "")) + el('input', ['id="searchinput"', 'type="search"', 'placeholder="搜索你想要知道的……"', 'autocomplete="off"'], "") + el('i', ['class="inverted circular search link icon"'], ""));
  return el('header', [], el('div', ['id="head"', 'class="ui inverted vertical masthead center aligned segment"'], (config.hitokoto ? el('div', ['id="nav"', 'class="ui container"'], nav) : "") + el('div', ['id="title"', 'class="ui text container"'], title + (config.search ? input + menu : "") + `${config.selling_ads ? '<div><a id="menubtn" class="red ui icon inverted button"><i class="heart icon"></i> 喜欢此域名 </a></div>' : ''}`)));
}

export function renderMain() {
  const main = config.lists.map((item) => {
    const card = (url, name, desc) => el('a', ['class="card"', `href=${url}`, 'target="_blank"'], el('div', ['class="content"'], el('img', ['class="left floated avatar ui image"', `src=${getFavicon(url)}`], "") + el('div', ['class="header"'], name) + el('div', ['class="meta"'], desc)));
    const divider = el('h4', ['class="ui horizontal divider header"'], el('i', [`class="${item.icon} icon"`], "") + item.name);

    const content = el('div', ['class="ui four stackable cards"'], item.list.map((link) => {
      return card(link.url, link.name, link.desc);
    }).join(""));

    return el('div', ['class="ui basic segment"'], divider + content);
  }).join("");

  return el('main', [], el('div', ['class="ui container"'], main));
}

export function renderSeller() {
  const item = (type, content) => el('div', ['class="item"'], el('i', [`class="${type} icon"`], "") + el('div', ['class="content"'], content));
  const title = el('h1', ['class="ui yellow dividing header"'], el('i', ['class="gem outline icon"'], "") + el('div', ['class="content"'], config.sell_info.domain + ' 正在出售'));
  const action = el('div', ['class="actions"'], el('div', ['class="ui basic cancel inverted button"'], el('i', ['class="reply icon"'], "") + '返回'));

  const contact = config.sell_info.contact.map((list) => {
    return item(list.type, list.content);
  }).join("");
  const column = el('div', ['class="column"'], el('h3', ['class="ui center aligned icon inverted header"'], el('i', ['class="circular envelope open outline grey inverted icon"'], "") + '联系我') + el('div', ['class="ui relaxed celled large list"'], contact));
  const price = el('div', ['class="column"'], el('div', ['class="ui large yellow statistic"'], el('div', ['class="value"'], el('i', [`class="${config.sell_info.mon_unit} icon"`], "") + config.sell_info.price)));
  const content = el('div', ['class="content"'], el('div', ['class="ui basic segment"'], el('div', ['class="ui two column stackable center aligned grid"'], el('div', ['class="ui inverted vertical divider"'], '感兴趣？') + el('div', ['class="middle aligned row"'], price + column))));

  return el('div', ['id="seller"', 'class="ui basic modal"'], title + content + action);
}

export function renderHTML(index, seller) {
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
        $('#search-fav').attr('src', $(e.target).data('url').match(/https?:\\/\\/\\S+\\/)[0] + 'favicon.ico');
      });
      $('.search').on('click', function (e) {
        var url = $('#sengine a.active').data('url');
        url = url.replace(/\\$s/, $('#searchinput').val());
        window.open(url);
      });
      $("#searchinput").bind("keypress", function(event){
        if (event.keyCode == 13){
          $(".search").click();
        }
      });
      $('#menubtn').on('click', function (e) {
        $('#seller').modal('show');
      });
    </script>
  </body>
  </html>`;
}

  /*通过分析链接 实时获取favicon
  * @url 需要分析的Url地址
  */
  function getFavicon(url) {
    const domain = url.replace(/^https?:\/\//, '').split('/')[0];
    return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
    }