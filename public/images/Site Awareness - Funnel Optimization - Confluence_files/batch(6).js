try {
/* module-key = 'com.gliffy.integration.confluence:gliffy-macro-html5-init-resources', location = 'js/gliffy-viewer-analytics.js' */
(function(){window.GLIFFY=window.GLIFFY||{};GLIFFY.initViewerAnalytics=function(f,g,b,a){function d(i,h){$(window).trigger(i+".gliffyAnalytics",h)}function e(){d("setCustomVariables",{product:"Confluence",license:b,numUsers:(a+" Users")});d("init",{accountType:"google",accountID:"UA-248648-8",optPageName:"viewer",debug:false});d("logEvents",{logEvents:true,logger:console});d("trackEvent",{category:"viewer",action:"showViewer"})}var c=f+"/rest/gliffy/1.0/properties/com.gliffy.integration.confluence.ANALYTICS_OFF";$.ajax({url:c,type:"GET",cache:false,success:function(h){if(h["com.gliffy.integration.confluence.ANALYTICS_OFF"]!==true){if(g){$.ajax({url:f+"/rest/gliffy/1.0/diagrams/"+g+"/permission",type:"GET",cache:false,success:function(i){e()},error:function(k,i,j){},dataType:"json"})}else{e()}}else{}},error:function(j,h,i){},dataType:"json"})}}());
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.gliffy.integration.confluence:gliffy-macro-html5-init-resources', location = '/templates/gliffy-viewerinit.soy' */
// This file was automatically generated from gliffy-viewerinit.soy.
// Please don't edit this file by hand.

if (typeof gliffySoy == 'undefined') { var gliffySoy = {}; }
if (typeof gliffySoy.viewer == 'undefined') { gliffySoy.viewer = {}; }


gliffySoy.viewer.init = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="gliffy-html5-zoom-holder" class="gliffy-hidden"><a href="#" id="gliffy-empty-fancybox"><img /></a></div>');
  return opt_sb ? '' : output.toString();
};


gliffySoy.viewer.zoomControls = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="gliffy-controls"><img class="gliffy-button gliffy-reset" src="', soy.$$escapeHtml(opt_data.path), '/icons/fit_to_screen.png" title="', soy.$$escapeHtml("Fit to Modal"), '" alt="', soy.$$escapeHtml("Fit to Modal"), '" /><div class="gliffy-slider-container"></div></div>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.gliffy.integration.confluence:gliffy-macro-html5-init-resources', location = 'js/gliffy-viewerinit.js' */
AJS.toInit(function(a){a("body").append(gliffySoy.viewer.init())});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


