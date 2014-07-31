(function (global) {
    var elems,
        getElementParent = function (e, n) {
            // default --> n = 0
            n = n || 0;

            var node = e.parentElement;
            if (!node)
                return e;
 
            // if n > 1 then recursive
            return (n > 1) ? getElementParent(node, --n) : e;
        },
        findElementParent = function (e, f) {
            if (!e)
                return null;
            else
                return (e.tagName.toLowerCase() === f) ? e :
                    findElementParent(e.parentElement, f);
        },
        mk_keyboard_event = function (type, key, target) {
            var evt = document.createEvent('KeyboardEvent');

            evt.initKeyboardEvent(
                type, true, true, global, "Enter", 0, false,
                false, false, false, false);
            evt.__defineGetter__("keyCode", function () { return key; });
            evt.__defineGetter__("charCode", function () { return key; });
            evt.__defineGetter__("which", function () { return key; });
            evt.__defineGetter__("srcElement", function () { return target; });
            evt.__defineGetter__("target", function () { return target; });
            
            return evt;
        },
        enter_obj = function (obj) {
            ["keydown", "keypress", "keyup"].forEach(function (e) {
                var evt = mk_keyboard_event(e, 0x0D, obj);
                obj.dispatchEvent(evt);
            });
        },
        click_event = function (e) {
            var form = findElementParent(this, 'form');
 
            if (form) {
                var input_box = form.querySelector('textarea');
                if (input_box && input_box.name.indexOf('add_comment_text') === 0) {
                    input_box.className = input_box.className.replace(/DOMControl_placeholder/g, '');
                    input_box.value = '<(_ _)>';
 
                    enter_obj(input_box);
                    // input_box.value = '';                   

                    // form.submit(); // You'll got an ERROR!!!
                    console.info('<(_ _)> \\Worship/');
                }
            }
 
            e.preventDefault();
            return;
        },
        worship = function () {
            elems = document.querySelectorAll('._5pcp._5vsi:not(.worship), .clearfix > .clearfix > ._4bl9:not(.worship)')
            elems = Array.prototype.slice.call(elems);
            elems.forEach(function (elem, index, array) {
                var a = document.createElement('a'),
                    txt = document.createTextNode(' · ');
 
                a.href = '#';
                a.addEventListener('click', click_event, false);
                a.textContent = '<(_ _)>';
 
                elem.appendChild(txt);
                elem.appendChild(a);
                elem.className += ' worship';
                return true;
            });
        };
 
    if (!global.worship) {
        global.worship = worship;
        global.worship.stop = function () {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        };
        global.worship.start = function () {
            if (!this.timer) {
                this.timer = setInterval(function () { worship(); }, 1000);
            }
        };
        global.worship.timer = null;
        global.worship.start();
    }
    worship();
})(window);