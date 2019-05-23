---
layout: home
category: steps
next: 'step-02/'
solution: 'step-01/solution/'
title: Let's begin with some static HTML
---

This is the initial step of the tutorial. In this step you won't need to code, everything is already coded for you.

Remember, to see the app running in a browser, open a separate terminal/command line tab or window, go to the project directory and start a webserver on that folder.

> As explained in the [introduction to the tutorial](../), you will only need a web-server to test your code
>
> If you have Python in your system, the easiest way would be to run the embeded SimpleHTTPServer. Go to the project directory and run
>
> ```
> # Python 2.x
> python -m SimpleHTTPServer
> ```
>
> or 
>
> ```
> # Python 3.x
> python -m http.server
> ```
>
>to start the web server. Now, open a browser window for the app and navigate to http://localhost:8000/app/index.html to see the current state of the app.
>
> If you have [NodeJS](http://nodejs.org) in your system, we have put a minimalist JavaScript web-server on `./scripts/web-server.js`. To see the app running in a browser, open a separate terminal/command line tab or window, go to the project directory and then run `node ./scripts/web-server.js` to start the web server. 


Now, open a browser window for the app and navigate to `http://localhost:8000/app/` (or the port your webserver uses) to see the current state of the app.

In order to illustrate how Vue enhances standard HTML, you will create a purely static HTML page and then examine how we can turn this HTML code into a template that Vue will use to dynamically display the same result with any set of data.

In this step you will add some basic information about two beers to an HTML page.

## The structure of the app ##

As you can see, the `app` folder have several sub-folders:

* `css`: the stylesheets for the app.
* `components`: here you will find the definition of the Vue components used in the tutorial

And a `data` folder to serve the static data (that would be replaced by a REST entrypoint in a real world application), with a sub-folder:

* `beers`: a service endpoint with all the information about our beer collection. It will be used in the later steps of the tutorial.


## Dependencies

To simplify third-party dependencies management, all the codes steps and the application you will build will look for the dependencies in the same `node_modules` folder at the root of the repository. 

All the dependencies have been included in the git repository. The goal is that you could use the project even without `node` and/or `npm` installed on your computer, or in a full offline setting.

## What must I do? ##

Add the beer information to the `app/index.html` file:


    <ul>
      <li>
        <span>Affligem Blond</span>
        <p>
          Affligem Blonde, the classic clear blonde abbey ale, with a gentle roundness and 6.8% alcohol.
          Low on bitterness, it is eminently drinkable.
        </p>
      </li>
      <li>
        <span>Affligem Tripel</span>
        <p>
          The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma,
          delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle.
        </p>
      </li>
    </ul>

## Additional experiments ##

Try adding more static HTML to `app/index.html`. For example:


    <p>Total number of beers: 2</p>

## Summary

We have done an app skeleton for a beers app. To begin adding dynamism, go to [step-02](../step-02).    
