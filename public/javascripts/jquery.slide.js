// jquery.slide.js
// 0.3
// Author: Patrick Lam (zidizei.com)
// Project URL: http://code.google.com/p/jslide/
//
// Dependencies:
// jQuery 1.3.2 (jquery.com)


(function($){

    var jSlide = function(element, options)
    {
        element = jQuery(element);

        this.calWidth = function(element)
        {
            var buffer = '0';

            if(!isNaN(element.find('ul.layers').children().css('width').replace(/px/, '')))
            buffer = element.find('ul.layers').children().css('width').replace(/px/, '');

            if(!isNaN(element.find('ul.layers').children().css('marginRight').replace(/px/, '')))
            buffer = Number(buffer) + Number(element.find('ul.layers').children().css('marginRight').replace(/px/, ''));

            if(!isNaN(element.find('ul.layers').children().css('marginLeft').replace(/px/, '')))
            buffer = Number(buffer) + Number(element.find('ul.layers').children().css('marginLeft').replace(/px/, ''));

            if(!isNaN(element.find('ul.layers').children().css('paddingLeft').replace(/px/, '')))
            buffer = Number(buffer) + Number(element.find('ul.layers').children().css('paddingLeft').replace(/px/, ''));

            if(!isNaN(element.find('ul.layers').children().css('paddingRight').replace(/px/, '')))
            buffer = Number(buffer) + Number(element.find('ul.layers').children().css('paddingRight').replace(/px/, ''));

            // yes, this weird function calculates the actual width of the <li>, including stuff like margin and padding ...
            return buffer;
        }
        this.calHeight = function(element)
        {
            var buffer = '0';

            if(!isNaN(element.find('ul.layers').children().css('height').replace(/px/, '')))
            buffer = element.find('ul.layers').children().css('height').replace(/px/, '');

            if(!isNaN(element.find('ul.layers').children().css('marginTop').replace(/px/, '')))
            buffer = Number(buffer) + Number(element.find('ul.layers').children().css('marginTop').replace(/px/, ''));

            if(!isNaN(element.find('ul.layers').children().css('marginBottom').replace(/px/, '')))
            buffer = Number(buffer) + Number(element.find('ul.layers').children().css('marginBottom').replace(/px/, ''));

            if(!isNaN(element.find('ul.layers').children().css('paddingTop').replace(/px/, '')))
            buffer = Number(buffer) + Number(element.find('ul.layers').children().css('paddingTop').replace(/px/, ''));

            if(!isNaN(element.find('ul.layers').children().css('paddingBottom').replace(/px/, '')))
            buffer = Number(buffer) + Number(element.find('ul.layers').children().css('paddingBottom').replace(/px/, ''));

            // and this weird function calculates the actual height of the <li>, including stuff like margin and padding ...
            return buffer;
        }

        var obj = this;

        this.settings = $.extend({}, $.fn.slide.defaults, options);
        this.settings.layersSize = element.find('ul.layers').children().size();
        this.settings.layerWidth = this.calWidth(element);
        this.settings.layerHeight = this.calHeight(element);
        this.settings.nameId = element.attr('id');


        this.debug = function(message)
        {
            if(obj.settings.debug == "1") {
                if(window.console && window.console.log) {
                    window.console.log('[jSlide:'+this.settings.slideNr+'] ' + message);
                } else {
                    alert('[jSlide:'+this.settings.slideNr+'] ' + message)
                }
            }
        };

        this.toggleLoop = function(speed)
        {
            if(obj.settings.loopNr == null) {
                if(!isNaN(speed))
                    obj.settings.loopNr = window.setInterval(function(){ obj.slideTo(Number(obj.settings.slidePos+1)); }, speed);
            } else {
                clearInterval(obj.settings.loopNr);
                obj.settings.loopNr = null;
            }
        };

        this.switchActive = function()
        {
            jQuery('#'+this.settings.nameId+' ul.indexwork li a').each(function(intIndex) {
                jQuery(this).removeClass('active');
            });
            jQuery('#'+this.settings.nameId+' ul.indexwork li:nth-child('+Number(obj.settings.slidePos+1)+') a').addClass('active');
        };

        this.slideTo = function(pos)
        {
            if(typeof pos != "number") {
                jQuery('#'+obj.settings.nameId+' ul.layers li').each(function(intIndex) {
                    if(jQuery(this).attr('title') == pos)
                        pos = intIndex;
                });
            }

            if(pos < obj.settings.layersSize && pos >= 0 && obj.settings.layersSize > "1")
            {   // nothing special, just go to the next/previous work
                // switchTitle(current_pos);
                if (obj.settings.alignment == 'vertical') {
                    var distance = pos*obj.settings.layerHeight;

                    if (obj.settings.direction == 'left') {
                        jQuery('#'+obj.settings.nameId+' ul.layers li').animate({
                            marginTop: "-"+distance+"px"
                        }, obj.settings.speed[0], obj.settings.easing);
                    } else {
                        jQuery('#'+obj.settings.nameId+' ul.layers li').animate({
                            marginTop: distance+"px"
                        }, obj.settings.speed[0], obj.settings.easing);
                    }

                    obj.settings.slidePos = pos;
                } else {
                    var distance = pos*obj.settings.layerWidth;

                    if (obj.settings.direction == 'left') {
                        jQuery('#'+obj.settings.nameId+' ul.layers li').animate({
                            marginLeft: "-"+distance+"px"
                        }, obj.settings.speed[0], obj.settings.easing);
                    } else {
                        jQuery('#'+obj.settings.nameId+' ul.layers li').animate({
                            marginRight: "-"+distance+"px"
                        }, obj.settings.speed[0], obj.settings.easing);
                    }

                    obj.settings.slidePos = pos;
                }
            }
            else if(pos >= obj.settings.layersSize && obj.settings.layersSize > "1" && obj.settings.repeatNex == "1")
            {   // reached the end of the line, go back to the start
                // switchTitle(current_pos);
                jQuery('#'+obj.settings.nameId+' ul.layers li').animate({
                    marginLeft: "0px",
                    marginRight: "0px",
                    marginTop: "0px"
                }, obj.settings.speed[0], obj.settings.easing);

                obj.settings.slidePos = '0';
            }
            else if(pos < "0" && obj.settings.layersSize > "1" && obj.settings.repeatPrev == "1")
            {   // reached the beginning of the line, go all the way to the end
                // switchTitle(current_pos);
                if (obj.settings.alignment == 'vertical') {
                    var distance = (obj.settings.layersSize-1)*obj.settings.layerHeight;

                    if (obj.settings.direction == 'left') {
                        jQuery('#'+obj.settings.nameId+' ul.layers li').animate({
                            marginTop: "-"+distance+"px"
                        }, obj.settings.speed[0], obj.settings.easing);
                    } else {
                        jQuery('#'+obj.settings.nameId+' ul.layers li').animate({
                            marginTop: ""+distance+"px"
                        }, obj.settings.speed[0], obj.settings.easing);
                    }

                    obj.settings.slidePos = (obj.settings.layersSize-1);
                } else {
                    var distance = (obj.settings.layersSize-1)*obj.settings.layerWidth;

                    if (obj.settings.direction == 'left') {
                        jQuery('#'+obj.settings.nameId+' ul.layers li').animate({
                            marginLeft: "-"+distance+"px"
                        }, obj.settings.speed[0], obj.settings.easing);
                    } else {
                        jQuery('#'+obj.settings.nameId+' ul.layers li').animate({
                            marginRight: "-"+distance+"px"
                        }, obj.settings.speed[0], obj.settings.easing);
                    }

                    obj.settings.slidePos = (obj.settings.layersSize-1);
                }
            } else {
                return false;
            }

//            if(obj.settings.title_id == "1" && obj.settings.loopNr == null) {
//                var loc = jQuery('#'+obj.settings.nameId+' ul.layers li:nth-child('+Number(obj.settings.slidePos+1)+')').attr('title');
//                if(obj.settings.slideNr > 1) {
//                    window.location = "index.html#"+loc+"--"+obj.settings.slideNr;
//                } else {
//                    window.location = "index.html#"+loc;
//                }
//            } else if(obj.settings.title_id == "0" && obj.settings.loopNr == null) {
//                if(obj.settings.slideNr > 1) {
//                    window.location = "index.html#"+Number(obj.settings.slidePos+1)+"--"+obj.settings.slideNr;
//                } else {
//                    window.location = "index.html#"+Number(obj.settings.slidePos+1);
//                }
//            }

            obj.switchActive();
            obj.debug('#'+obj.settings.nameId+' slided to pos:'+Number(obj.settings.slidePos+1));

            return false;
        };



        if(this.settings.loop[0] == '1')
        this.settings.loopNr = window.setInterval(function(){ obj.slideTo(Number(obj.settings.slidePos+1)); }, obj.settings.speed[1]);

        jQuery('#'+this.settings.nameId+' ul.layers li').each(function(intIndex) {

            if(obj.settings.alignment == "horizontal" && obj.settings.direction == "left")
                jQuery(this).css('left', intIndex*obj.settings.layerWidth+'px');
            if(obj.settings.alignment == "vertical" && obj.settings.direction == "left")
                jQuery(this).css('top', intIndex*obj.settings.layerHeight+'px');

            if(obj.settings.alignment == "horizontal" && obj.settings.direction == "right")
                jQuery(this).css('right', intIndex*obj.settings.layerWidth+'px');
            if(obj.settings.alignment == "vertical" && obj.settings.direction == "right")
                jQuery(this).css('top', '-'+intIndex*obj.settings.layerHeight+'px');

        });


        jQuery('#'+this.settings.nameId+' .nextwork').click(function(){
            obj.slideTo(Number(obj.settings.slidePos)+Number(1));
            if(obj.settings.loop[1] == '0' && obj.settings.loop[0] == '1') {
                clearInterval(obj.settings.loopNr);
            } else if(obj.settings.loop[1] > '0' && obj.settings.loop[0] == '1') {
                clearInterval(obj.settings.loopNr);
                obj.settings.loopNr = window.setInterval(function(){ obj.slideTo(Number(obj.settings.slidePos+1)); }, obj.settings.loop[1]);
            }
            return false;
        });

        jQuery('#'+this.settings.nameId+' .prevwork').click(function(){
            obj.slideTo(obj.settings.slidePos-1);
            if(obj.settings.loop[1] == '0' && obj.settings.loop[0] == '1') {
                clearInterval(obj.settings.loopNr);
            } else if(obj.settings.loop[1] > '0' && obj.settings.loop[0] == '1') {
                clearInterval(obj.settings.loopNr);
                obj.settings.loopNr = window.setInterval(function(){ obj.slideTo(Number(obj.settings.slidePos+1)); }, obj.settings.loop[1]);
            }
            return false;
        });


        for(var i=0; i<this.settings.layersSize; i++)
        {
            if(i == 0) { var activeClass = ' class="active"'; } else { var activeClass = ''; }

            if(obj.settings.title_id == 0) {
                jQuery('#'+this.settings.nameId+' ul.indexwork').append('<li><a href="#"'+activeClass+'>'+Number(i+1)+'</a></li>');
            } else if(obj.settings.title_id == 1) {
                var linkTitle = jQuery('#'+this.settings.nameId+' ul.layers li:nth-child('+Number(i+1)+')').attr('title');

                jQuery('#'+this.settings.nameId+' ul.indexwork').append('<li><a href="#"'+activeClass+'>'+linkTitle+'</a></li>');
            }
        }

        jQuery('#'+this.settings.nameId+' ul.indexwork li a').each(function(intIndex) {

            jQuery(this).click(function(){
                obj.slideTo(intIndex);
                if(obj.settings.loop[1] == '0' && obj.settings.loop[0] == '1') {
                    clearInterval(obj.settings.loopNr);
                } else if(obj.settings.loop[1] > '0' && obj.settings.loop[0] == '1') {
                    clearInterval(obj.settings.loopNr);
                    obj.settings.loopNr = window.setInterval(function(){ obj.slideTo(Number(obj.settings.slidePos+1)); }, obj.settings.loop[1]);
                }
                return false;
            });

        });
    };

    $.fn.slide = function(options)
    {
        var elementsIndex = new Array();
        var returnElement = null;
        var cururl = document.location.toString();
        var destination = document.location.toString().split('#');

        this.each(function() {
            var element = jQuery(this);

            // Return early if this element already has a plugin instance
            if(element.data('jslide')) {
                returnElement = element;
                return;
            }

            // pass options to plugin constructor
            var jslide = new jSlide(this, options);
            elementsIndex[$.fn.slide.defaults.slideNr] = jslide;
            $.fn.slide.defaults.slideNr++;


            // autoload
            if(destination.length > 1) {
                for(i=1; i<destination.length; i++)
                {
                    if(jslide.settings.slideNr > 1) {
                        var slides = destination[i].split('--');
                    } else {
                        var slides = new Array(destination[1], 1);
                    }

                    if(jslide.settings.autoload[0] == "1" && jslide.settings.slideNr == slides[1]) {
                        setTimeout(function() {
                            if(!isNaN(slides[0]*1)) {
                                jslide.slideTo(slides[0]-1);
                            } else {
                                jslide.slideTo(slides[0]);
                            }
                        }, jslide.settings.autoload[1]);
                    }
                }
            }

            // Store plugin object in this element's data
            element.data('jslide', jslide);
        });

        if(returnElement != null) return returnElement.data('jslide');
    };

    $.fn.slide.defaults = {
        slideNr: '1',      // script vars, don't change
        loopNr: null,      // script vars, don't change
        slidePos: '0',     // script vars, don't change
        easing: '',
        debug: 0,                    // if TRUE, enables firebug console messages
        title_id: 0,                 // if TRUE, uses title attr of <li> instead of numbers in url
        speed: [500, 2000],          // first value: speed of slideffect, second value: pause between slides (when loop is active)
        autoload: [1, 300],          // first value: if TRUE, auto-slides to #element set in url, second value: autoslide delay
        loop: [0, 0],                // first value: TRUE or FALSE, second value: loop interrupt at user input or alternate loop speed
        repeatNex: 1,                // next button: jump back to first element when reaching end
        repeatPrev: 0,               // previous button: jump to last element when at the beginning
        direction: 'left',           // left: content slides from right to LEFT (bottom to top), right: content slides from left to RIGHT (top to bottom)
        alignment: 'horizontal'      // layer alignment
    };

})(jQuery);