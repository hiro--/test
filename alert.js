;(function($, window, document,undefined){
var plugin = function(ele,opt){
    this.$div = $("<div>");
    this.divType = {
        "default" : {
            "background-color" : "#eee",
            "border" : "1px solid #aaa",
            "box-shadow" : "0 0 5px #aaa",
        },
        "success" : {
            "color" : "#3c763d",
            "background-color" : "#b2dba1",
            "background-image" : "linear-gradient(to bottom, #dff0d8 0px, #c8e5bc 100%)",
            "border" : "1px solid #b2dba1",
            "box-shadow" : "0 0 5px #b2dba1",
        },
        "error" : {
            "color" : "#a94442",
            "background-color" : "#f2dede",
            "background-image" : "linear-gradient(to bottom, #f2dede 0px, #e7c3c3 100%)",
            "border" : "1px solid #dca7a7",
            "box-shadow" : "0 0 5px #dca7a7",
        }
    };
    this.defaultDivCss = {
        "display" : "block",
        "position" : "absolute",
        "z-index" : "9999",
        "width" : "300px",
        "min-height" : "80px",
        
        "font-weight" : "bold",
        "font-size" : "20px",
        "padding" : "10px",
        "border-radius" : "5px",
    };
    this.defaultMaskCss = {
        "display" : "block",
        "position" : "absolute",
        "z-index" : "9998",
        "background-color" : "black",
        "top" : "0",
        "left" : "0",

        "filter" : "alpha(opacity=50)",
        "-moz-opacity" : "0.5" ,
        "opacity": "0.5",
    };
    this.delay = "1500";
    this.options = opt==undefined ? {} : opt;
};
plugin.prototype = {


create : function(){
    this.$div.html(this.options.content);
    this.hide();

    var css = $.extend({}, this.defaultDivCss, this.type(),this.options.css);
    this.$div.css(css).appendTo($("body"));
    this.mediate(css);
    this.mask();
},
type : function(){
    var type = this.options.type==undefined ? "default" : this.options.type;
    return this.divType[type];
},
mediate : function(css){
    css.left = css.left==undefined ? ($(window).width() - parseInt(css.width))/2 + "px" : css.left;
    css.top = css.top==undefined ? ($(window).height() - this.$div.height())/2 - 100 + "px" : css.top;
    if(this.$div.height() <= parseInt(css["min-height"])){
        css["line-height"] = css["min-height"];    
    }
    this.$div.css(css);
},
hide : function(){
    document.documentElement.style.overflow='hidden';
    var that = this;

    setTimeout(function(){
        that.$div.fadeOut(300,function(){
            that.$div.remove();
            document.documentElement.style.overflow='auto';
        });
    },this.options.delay==undefined ? this.delay : this.options.delay);

},
mask : function(){
    if(this.options.maskFlag==false){
        return false;
    }
    var css = this.defaultMaskCss;
    var maskDiv = $("<div>");
    css.width = $(window).width();
    css.height = $(window).height();
    maskDiv.css(css).appendTo($("body"));
    setTimeout(function(){
        maskDiv.fadeOut(300,function(){
            maskDiv.remove();
        });
    },this.options.delay==undefined ? this.delay : this.options.delay); 
    that = this;
    maskDiv.click(function(){
        this.remove();
        that.$div.remove();
    });
}

};

    $.fn.myAlert = function(options) {
        var myPlugin = new plugin(this, options);
        $(this).click(function(){
            myPlugin.create();
        });
        return this;
    };
})(jQuery, window, document);
