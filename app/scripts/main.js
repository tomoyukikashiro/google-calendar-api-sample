(function(exports){

    'use strict';

    /**
     * @class GapiClientManager
     */
    var clientId = '66786072048-svltl5fkdp3f4f80hu0cqconifnebd08.apps.googleusercontent.com',
        scope = 'https://www.googleapis.com/auth/calendar',
        $authorizeButton = $('#authorize-button'),
        $settingsElms = $('.calendar-settings');

    var GapiClientManager = {

        onLoadGapiClient: function() {
            $authorizeButton.on('click', $.proxy(this.handleAuthClick, this));
            NewEventInserter.bindClickEvent();
            this.showButton();
        },

        showButton: function() {
            $authorizeButton.show();
        },

        handleAuthResult: function(authResult){
            if (authResult && !authResult.error) {
                this.loadClient($.proxy(this.getCalenderList, this));
            }
        },

        loadClient: function(callback) {
            gapi.client.load('calendar', 'v3', callback);
        },

        getCalenderList: function() {
            // @see
            // https://developers.google.com/google-apps/calendar/v3/reference/calendarList/list
            var config = {
                    minAccessRole: 'owner'
                },
                request = gapi.client.calendar.calendarList.list(config);

            request.execute(function(res){
                $settingsElms.show();
                CalendarListRenderer.render(res.items);
            });
        },

        handleAuthClick: function(){
            this.auth();
            return false;
        },

        auth: function() {
            var config = {
                'client_id': clientId,
                'scope'    : scope,
                'immediate': false
            };
            gapi.auth.authorize(config, $.proxy(this.handleAuthResult, this));
        }
    };
    /**
     * @class CalendarListRenderer
     */
    var CalendarListRenderer = {
        getSelectedCalendar: function() {
            return $('.calendar-list input:checked').val();
        },
        render: function(list){
            var $elms = this.makeListElm(list),
                $parent = $('.calendar-list'),
                $ul = $parent.find('ul');

            $ul.remove();
            $parent.append($elms);
        },
        makeListElm: function(list){
            var me = this,
                $ul = $('<ul></ul>');
            $.each(list, function(index, item){
                $ul.append(me.makeListItemElm(index, item));
            });
            return $ul;
        },
        makeListItemElm: function(index, item) {
            var $li = $('<li></li>'),
                $label = $('<label>'),
                $input = $('<input type="checkbox">'),
                id = 'calendar-' + index;
            $input.val(item.id);
            $input.attr('id', id);
            $label.text(item.summary);
            $label.attr('for', id);

            $li.append($input).append($label);
            return $li;
        }
    };
    var NewEventInserter = {
        bindClickEvent: function() {
            var $target = $('.add-event-list');
            $target.on('click', 'li', $.proxy(this.onClickEvent, this));
        },
        onClickEvent: function(e) {
            var $target = $(e.currentTarget),
                calendarId = CalendarListRenderer.getSelectedCalendar(),
                yyyy = $target.data('event-date'),
                date = yyyy + '-02-14',
                param = {
                    summary: $target.find('button').text(),
                    end  : {
                        date: date
                    },
                    start: {
                        date: date
                    }
                },
                request = gapi.client.calendar.events.insert({
                    'calendarId': calendarId, // default calendar : 'primary'
                    'resource': param
                });
            if(calendarId){
                request.execute($.proxy(this.onInsertEnd, this));
            }else{
                window.alert('please select your calendar.');
            }
        },
        onInsertEnd: function(res) {
            if(window.confirm('create event !! \nDo you open the event ? ')){
                window.open(res.htmlLink);
            }
        }
    };

    // -----------------------------------
    // export
    // -----------------------------------
    exports.onLoadGapiClient = $.proxy(GapiClientManager.onLoadGapiClient, GapiClientManager);

}(window));
