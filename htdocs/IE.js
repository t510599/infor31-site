function IEtest() {
    return /Trident/g.test(navigator.userAgent)
}

if (IEtest()) {
    alert('You are using IE! Please use Firefox or Chrome for better experience.');
}