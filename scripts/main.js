!function(a){"use strict";var b="66786072048-svltl5fkdp3f4f80hu0cqconifnebd08.apps.googleusercontent.com",c="https://www.googleapis.com/auth/calendar",d=$("#authorize-button"),e=$(".calendar-settings"),f={onLoadGapiClient:function(){d.on("click",$.proxy(this.handleAuthClick,this)),h.bindClickEvent(),this.showButton()},showButton:function(){d.show()},handleAuthResult:function(a){a&&!a.error&&this.loadClient($.proxy(this.getCalenderList,this))},loadClient:function(a){gapi.client.load("calendar","v3",a)},getCalenderList:function(){var a={minAccessRole:"owner"},b=gapi.client.calendar.calendarList.list(a);b.execute(function(a){e.show(),g.render(a.items)})},handleAuthClick:function(){return this.auth(),!1},auth:function(){var a={client_id:b,scope:c,immediate:!1};gapi.auth.authorize(a,$.proxy(this.handleAuthResult,this))}},g={getSelectedCalendar:function(){return $(".calendar-list input:checked").val()},render:function(a){var b=this.makeListElm(a),c=$(".calendar-list"),d=c.find("ul");d.remove(),c.append(b)},makeListElm:function(a){var b=this,c=$("<ul></ul>");return $.each(a,function(a,d){c.append(b.makeListItemElm(a,d))}),c},makeListItemElm:function(a,b){var c=$("<li></li>"),d=$("<label>"),e=$('<input type="checkbox">'),f="calendar-"+a;return e.val(b.id),e.attr("id",f),d.text(b.summary),d.attr("for",f),c.append(e).append(d),c}},h={bindClickEvent:function(){var a=$(".add-event-list");a.on("click","li",$.proxy(this.onClickEvent,this))},onClickEvent:function(a){var b=$(a.currentTarget),c=g.getSelectedCalendar(),d=b.data("event-date"),e=d+"-02-14",f={summary:b.find("button").text(),end:{date:e},start:{date:e}},h=gapi.client.calendar.events.insert({calendarId:c,resource:f});c?h.execute($.proxy(this.onInsertEnd,this)):window.alert("please select your calendar.")},onInsertEnd:function(a){window.confirm("create event !! \nDo you open the event ? ")&&window.open(a.htmlLink)}};a.onLoadGapiClient=$.proxy(f.onLoadGapiClient,f)}(window);