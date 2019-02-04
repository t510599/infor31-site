function IEtest() {
    let usrAg = navigator.userAgent;
    return (/Trident/g.test(usrAg) || (usrAg.indexOf('MSIE') > -1));
}

if (IEtest()) {
    alert('You are using IE! Please use Firefox or Chrome for better experience.');
}