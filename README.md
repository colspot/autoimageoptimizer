# autoimageoptimizer
Optimize images dynamically

Basic usage:

Step 1: Place imagecompressor.php to root of your web directory.

Step 2: Time for some Some jQuery!

```
$('imageclass').autooptimizer({
  script: 'imagecompressor.php', /*Path to compressor script file*/
  breakpoints: [
    {
      screen: 720, /*screen size breakpoint*/
      settings: {
        maxWidth:720, /*Your desired image maxWidth*/
        maxHeight:320, /*Your desired image maxHeight*/
        quality:80 /*Image compression percent*/
      }
    },
    {
      screen: 480,
      settings: {
        maxWidth:320,
        maxHeight:320,
        quality:60
      }
    },
    ...
  ]
  });
```

Step 3: Enjoy! :)
