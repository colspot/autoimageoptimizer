$(function () {
  $.fn.autooptimizer = function (settings) {

      var script = settings.script || '';
      var maxwidth = settings.minWidth || false;
      var maxheight = settings.minHeight || false;
      var breakpoints = settings.breakpoints;
      var responsive = settings.responsive || false;
      var quality = settings.quality || 100;
      var resizeImage = true;

      var $this = $(this);

      function fetchImage(url,data) {
        var fetch = $.ajax({
          url:url,
          data:data,
          type:"GET",
          method: "GET"
        });
        return fetch;
      }

        $this.each(function () {
          var _this = this;
          var imagename = $(this).data('src');

          //Responsive:: Wrap in Responsive
          if (responsive) {
            $(_this).wrap('<picture></picture>');
            var picture = $(_this).parent();

            var i;
            var j=0;
          if(maxwidth){
            var data = {'maxwidth':maxwidth,'maxheight':maxheight,'resizeImage':resizeImage,'source':imagename,'quality':quality};
            fetchImage(script,data).done(function (res) {
              $(_this).attr('src',res);
              picture.prepend('<source media="(min-width: '+maxwidth+'px)" srcset="'+res+'"></source>');
            });
          }else{
            $(_this).attr('src',imagename);
          }

            if(resizeImage) {
              function makeSources(idx){
                var breakpoint = breakpoints[idx];
                var bp_setting = breakpoint.settings;
                var bp_data = {'maxwidth':bp_setting.maxWidth,'maxheight':bp_setting.maxHeight,'resizeImage':resizeImage,'source':imagename,'quality':bp_setting.quality};

                fetchImage(script,bp_data).done(function (res) {
                  picture.prepend('<source media="(max-width: '+breakpoint.screen+'px)" srcset="'+res+'"></source>');
                  if(typeof breakpoints[idx+1] !== 'undefined') {
                    j++;
                    makeSources(j);
                  }
                });
              }
              makeSources(j);
            }
          }else {

            var resized = 0;

            //Classic resize image
            for(i in breakpoints) {
              var breakpoint = breakpoints[i];
              var bp_setting = breakpoint.settings;
              var data = {'maxwidth':bp_setting.maxWidth,'maxheight':bp_setting.maxHeight,'resizeImage':resizeImage,'source':imagename,'quality':bp_setting.quality};

              if(window.innerWidth <= breakpoint.screen){
                fetchImage(script,data).done(function (res) {
                  $(_this).attr('src',res);
                });
                resized++;
              }
            }

            if(resized === 0 && maxwidth) {
              var data = {'maxwidth':maxwidth,'maxheight':maxheight,'resizeImage':resizeImage,'source':imagename,'quality':quality};
              fetchImage(script,data).done(function (res) {
                $(_this).attr('src',res);
              });
            }else if(resized === 0) {
              $(_this).attr('src',imagename);
            }

          }

        });

  };
})