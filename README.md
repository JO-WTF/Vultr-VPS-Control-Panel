# Vultr VPS Control Panel by React Native 

http://jo.wtf/vultr-vps-control-panel/

Vultr VPS Control Panel is an iOS app to manage your servers on Vultr.

Let’s fully utilize Vultr’s API.

That’s what I am saying, although for now, it is only utilizing part of them.

## Login

When using other Apps, you need to enable Vultr A
PI on their webpage and copy the API code to your App. What I did is, however, different.

As you can see, you only need to fill your Vultr account and password in the App, and that’s it.


So what did we do? We integrated a hidden webview in the app, and injected some javascript to fetch the API on the webpage. Even if you haven’t enabled your API, the javascript code will do that for you.

So we really made it easy to use.

You may ask, what will I do with your account detail? Actually, the only thing we do is sending it Vultr. We do not store it, we only store your API.
![](http://cdn.jo.wtf/wp-content/uploads/2016/06/Vultr-VPS-CP-Login.png)

## Server List

Well, basicly, it’s not really special. You will find basic information about all your servers (OS, power status, hardware, IP, and location .etc).

Of course, you have some shortcuts: Power on/off, Reboot, and destroy. By tapping on the server, you can toggle the shortcut list.

I have been considering whether those are the best options. Maybe the users prefer other functionalities instead of them. What do you think? I would like to know it.

While if you want to go to the server detail page, just tap on the arrow on the right hand side.

Oh, yes, there is another thing to mention: you might have noticed the tab bar. However, there is only one tab there (server). Well, there will be more later (but I am still thinking what to put there).

![](http://cdn.jo.wtf/wp-content/uploads/2016/06/Vultr-VPS-CP-Server-List.png)
## Server Details

At this moment, the App only shows little information. In the next version, there will be hopefully more functionalities.

I am planning to add:

* Take snapshots
* Take backups
* Restore from snapshots
* Restore from backups
* Change plan
* Change label
* and more…

![](http://cdn.jo.wtf/wp-content/uploads/2016/06/Vultr-VPS-CP-Server-Detail.png)
## Add Server

Personally, I quite like it here. You have got most options available (region, size, operating system, ipv6, private network, auto backups, DDoS protection, hostname and label), although not all of them.

I know you want more: create servers from snapshots, from backups, or with apps. I know it, really, I do know. Just give me little bit time.

As well as that, I also know that some people want to create block storage and dedicated servers. We will hopefully have that later.

I need to mention that, the price at the bottom in the page may not be accurate (if you reside in EU). VAT will apply to your account, unfortunately.

![](http://cdn.jo.wtf/wp-content/uploads/2016/06/Vultr-VPS-CP-Add-Server.png)
![](http://cdn.jo.wtf/wp-content/uploads/2016/06/Simulator-Screen-Shot-26-Jun-2016-18.54.59.png)

## Multiple Accounts?

What do you think?

I am not sure whether this is something you want though.

![](http://cdn.jo.wtf/wp-content/uploads/2016/06/Simulator-Screen-Shot-26-Jun-2016-18.43.32.png)

# Oops, some error happened.

Well, you will find this happens a lot (unfortunately) in our Vultr VPS Control Panel App. When you try to power on/off or reboot or destroy a server that you have just created, you will encounter this. Well, it’s understandable since the machine is still being initialized. But in the app, it only says “some error happened.

# Run this app

Before running this app, make sure you ran:

```
npm install
```

Mac and Xcode are required.
* Open `Vultr-VPS-Control-Panel/ios/VultrVPS.xcodeproj` in Xcode
* Hit the Run button

See [Running on device](https://facebook.github.io/react-native/docs/running-on-device-ios.html) if you want to use a physical device.
