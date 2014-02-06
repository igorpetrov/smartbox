/**
 * Main smartbox file
 */
(function (window, undefined) {

    var _ready = false,
        readyCallbacks = [];


    var userAgent=navigator.userAgent.toLowerCase();
    var detect= function(slug){
        return userAgent.indexOf(slug) !== -1;
    }

    var SB = {

        platform: 'browser',

        run: function () {

            var self = this;

            $(function () {
                self.setPlugins();
                setTimeout(function () {
                    self._onReady();
                });
            });

        },

        extend: function (platformName, prototype) {
            if ((prototype.detect != undefined && prototype.detect()) ||
                detect(prototype.platformUserAgent)
                ) {
                _.extend(this, prototype);
                this.platform = platformName;

                if (_.isFunction(this.onDetect)) {
                    this.onDetect();
                }
            }
        },


        /**
         * Can be overridden by function that calls after successfully detect()
         */
        onDetect: null,

        /**
         * Detecting current platform
         * @returns {boolean} true if running on current platform
         */


        config: {
            DUID: 'real'
        },


        /**
         * Main function
         * @param cb {Function} callback after initialization
         */
        ready: function (cb) {

            if (_ready) {
                cb.call(this);
            } else {
                readyCallbacks.push(cb);
            }
        },

        readyForPlatform: function (platform, cb) {
            var self = this;
            this.ready(function () {
                if (platform == self.platform) {
                    cb.call(self);
                }
            });
        },

        /**
         * Applying all ready callbacks
         * @private
         */
        _onReady: function () {
            _ready = true;

            for (var i = 0, len = readyCallbacks.length; i < len; i++) {
                readyCallbacks[i].call(this);
            }
        },


        utils: {
            /**
             * Show error message
             * @param msg
             */
            error: function (msg) {
                $$log(msg, 'error');
            },

            /**
             * Show messages in log
             * all functionality in main.js
             */
            log: {
                log: $.noop,
                state: $.noop,
                show: $.noop,
                hide: $.noop,
                startProfile: $.noop,
                stopProfile: $.noop
            },

            legend: {}
        },

        keys: {},

        DUID: '',


        /**
         * Get DUID in case of Config
         * @return {string} DUID
         */
        getDUID: function () {
            switch (SB.config.DUID) {
                case 'real':
                    this.DUID = this.getNativeDUID();
                    break;
                case 'mac':
                    this.DUID = this.getMac();
                    break;
                case 'random':
                    this.DUID = this.getRandomDUID();
                    break;
                /*case 'local_random':
                 this.DUID = this.getLocalRandomDUID();
                 break;*/
                default:
                    this.DUID = SB.config.DUID;
                    break;
            }
            //this.formattedDUID = _.formatText(this.DUID, 4, '-');
            //this.formattedDUID = this.formattedDUID.split('').reverse().join('').replace('-', '').split('').reverse().join('');


            return this.DUID;
        },

        /**
         * Returns random DUID for platform
         * @returns {string}
         */
        getRandomDUID: function () {
            return (new Date()).getTime().toString(16) + Math.floor(Math.random() * parseInt("10000", 16)).toString(16);
        },

        /**
         * Returns native DUID for platform if exist
         * @returns {string}
         */
        getMac: function () {
            return '';
        },

        /**
         * Returns native DUID for platform if exist
         * @returns {string}
         */
        getNativeDUID: function () {
            return '';
        },

        /**
         * Set custom plugins
         */
        setPlugins: function () {
        },

        // TODO: volume for all platforms
        volumeUp: function () {
        },
        volumeDown: function () {
        },
        getVolume: function () {
        },

        setData: function () {
        },

        getData: function () {
        },

        removeData: function () {
        },

        exit: function () {
        }
    };


    window.SB = SB;
})(this);