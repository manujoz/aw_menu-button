import { PolymerElement, html } from "../aw_polymer_3/polymer/polymer-element.js";
import { AwExternsFunctionsMixin } from "../aw_extern_functions/aw-extern-functions-mixin.js";
import "../aw_polymer_3/paper-ripple/paper-ripple.js";
class AwMenuButton extends AwExternsFunctionsMixin(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host {
                    position: relative;
                    width: 50px;
                    height: 50px;
                    display: inline-block;
                }
                #container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    color: var(--aw-menu-button-color-hv, var(--aw-primary-color, #111111));
                }
                #container:hover span {
                    background-color: var(--aw-menu-button-color-hv, var(--aw-primary-color, #111111));
                }

                #contSpans {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                }

                #contSpans > span {
                    position: absolute;
                    left: 20%;
                    height: 2px;
                    width: 60%;
                    background-color: #111111;
                    background-color: var(--aw-menu-button-color, var(--aw-primary-color, #111111));
                    transition: all 0.5s;
                }
                #contSpans > span:nth-child(1) {
                    top: 28%;
                }
                #contSpans > span:nth-child(2) {
                    top: 48%;
                }
                #contSpans > span:nth-child(3) {
                    top: 48%;
                }
                #contSpans > span:nth-child(4) {
                    top: 68%;
                }
            </style>
            <div id="container" on-click="_onclick">
                <div id="contSpans">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <template is="dom-if" if="[[!noink]]">
                    <paper-ripple class="circle" recenters></paper-ripple>
                </template>
            </div>
        `;
    }
    static get properties() {
        return {
            top: { type: String },
            left: { type: String },
            right: { type: String },
            size: { type: String },
            effect: { type: String, value: "cross" },
            state: { type: String, value: "close", observer: "_effects", notify: !0 },
            timeout: { type: Object },
            preventdefault: { type: Boolean, value: !1 },
            noink: { type: Boolean, value: !1 },
        };
    }
    constructor() {
        super();
        this.spans = [];
    }
    connectedCallback() {
        super.connectedCallback();
        var nodes = this.$.contSpans.childNodes;
        for (let i = 0; i < nodes.length; i++) {
            if ("SPAN" === nodes[i].tagName) {
                this.spans.push(nodes[i]);
            }
        }
        this._setPosition();
    }
    _setPosition() {
        if (this.top || this.left || this.right) {
            this.style.position = "absolute";
            this.style.top = this.top;
            if (this.left) {
                this.style.left = this.left;
            }
            if (this.right) {
                this.style.right = this.right;
            }
        }
        if (this.size) {
            this.style.width = this.size;
            this.style.height = this.size;
        }
    }
    _onclick() {
        if (!this.preventdefault) {
            this.toggle();
        }
        if ("function" === typeof this.clickfunc) {
            let menu = {
                state: this.state,
                open: function () {
                    return this.open();
                }.bind(this),
                close: function () {
                    return this.close();
                }.bind(this),
                toggle: function () {
                    return this.toggle();
                }.bind(this),
            };
            this.clickfunc(menu);
        }
    }
    close() {
        this.state = "close";
    }
    open() {
        this.state = "open";
    }
    toggle() {
        if ("close" === this.state) {
            this.open();
        } else {
            this.close();
        }
    }
    _effects() {
        if (0 === this.spans.length) {
            return !1;
        }
        clearTimeout(this.timeout);
        switch (this.effect) {
            case "cross":
                if ("open" === this.state) {
                    this.spans[0].style = "left: 50%; width: 0px;";
                    this.spans[1].style = "transform: rotate(45deg);";
                    this.spans[2].style = "transform: rotate(-45deg);";
                    this.spans[3].style = "left: 50%; width: 0px";
                } else {
                    this.spans[0].removeAttribute("style");
                    this.spans[1].removeAttribute("style");
                    this.spans[2].removeAttribute("style");
                    this.spans[3].removeAttribute("style");
                }
                break;
            case "wink":
                if ("open" === this.state) {
                    this.spans[0].style = "top: 48%; transform: rotate(45deg);";
                    this.spans[1].style = "width: 0px;";
                    this.spans[2].style = "width: 0px; left: 80%;";
                    this.spans[3].style = "top: 48%; transform: rotate(-45deg);";
                } else {
                    this.spans[0].removeAttribute("style");
                    this.spans[1].removeAttribute("style");
                    this.spans[2].removeAttribute("style");
                    this.spans[3].removeAttribute("style");
                }
                break;
            case "winkReverse":
                if ("open" === this.state) {
                    this.spans[0].style = "top: 48%; transform: rotate(-45deg);";
                    this.spans[1].style = "width: 0px;";
                    this.spans[2].style = "width: 0px; left: 80%;";
                    this.spans[3].style = "top: 48%; transform: rotate(45deg);";
                } else {
                    this.spans[0].removeAttribute("style");
                    this.spans[1].removeAttribute("style");
                    this.spans[2].removeAttribute("style");
                    this.spans[3].removeAttribute("style");
                }
                break;
            case "bounce":
                if ("open" === this.state) {
                    this.spans[0].style = "left: 50%; width: 0px;";
                    this.spans[1].style = "transition: all 1s; transform: rotate(225deg);";
                    this.spans[2].style = "transition: all 1s; transform: rotate(-225deg);";
                    this.spans[3].style = "left: 50%; width: 0px;";
                } else {
                    this.spans[1].style = "transition: all 1s; transform: rotate(0deg);";
                    this.spans[2].style = "transition: all 1s; transform: rotate(0deg);";
                    this.timeout = setTimeout(
                        function () {
                            this.spans[0].removeAttribute("style");
                            this.spans[1].removeAttribute("style");
                            this.spans[2].removeAttribute("style");
                            this.spans[3].removeAttribute("style");
                        }.bind(this),
                        400
                    );
                }
                break;
            case "rotate":
                if ("open" === this.state) {
                    this.$.contSpans.style = "transition: all .9s; transform: rotate(360deg);";
                    this.spans[0].style = "transition: all .8s; left: 50%; width: 0px;";
                    this.spans[1].style = "transition: all .8s; transform: rotate(45deg);";
                    this.spans[2].style = "transition: all .8s; transform: rotate(-45deg);";
                    this.spans[3].style = "transition: all .8s; left: 50%; width: 0px;";
                } else {
                    this.$.contSpans.style = "transition: all .9s; transform: rotate(0deg);";
                    this.spans[0].style = "transition: all .8s; left: 20%; width: 60%;";
                    this.spans[1].style = "transition: all .8s; transform: rotate(0deg);";
                    this.spans[2].style = "transition: all .8s; transform: rotate(0deg);";
                    this.spans[3].style = "transition: all .8s; left: 20%; width: 60%;";
                    this.timeout = setTimeout(
                        function () {
                            this.$.contSpans.removeAttribute("style");
                            this.spans[0].removeAttribute("style");
                            this.spans[1].removeAttribute("style");
                            this.spans[2].removeAttribute("style");
                            this.spans[3].removeAttribute("style");
                        }.bind(this),
                        800
                    );
                }
                break;
            case "rotateReverse":
                if ("open" === this.state) {
                    this.$.contSpans.style = "transition: all .9s; transform: rotate(-360deg);";
                    this.spans[0].style = "transition: all .8s; left: 50%; width: 0px;";
                    this.spans[1].style = "transition: all .8s; transform: rotate(45deg);";
                    this.spans[2].style = "transition: all .8s; transform: rotate(-45deg);";
                    this.spans[3].style = "transition: all .8s; left: 50%; width: 0px;";
                } else {
                    this.$.contSpans.style = "transition: all .9s; transform: rotate(0deg);";
                    this.spans[0].style = "transition: all .8s; left: 20%; width: 60%;";
                    this.spans[1].style = "transition: all .8s; transform: rotate(0deg);";
                    this.spans[2].style = "transition: all .8s; transform: rotate(0deg);";
                    this.spans[3].style = "transition: all .8s; left: 20%; width: 60%;";
                    this.timeout = setTimeout(
                        function () {
                            this.$.contSpans.removeAttribute("style");
                            this.spans[0].removeAttribute("style");
                            this.spans[1].removeAttribute("style");
                            this.spans[2].removeAttribute("style");
                            this.spans[3].removeAttribute("style");
                        }.bind(this),
                        800
                    );
                }
                break;
            case "push":
                if ("open" === this.state) {
                    this.spans[0].style = "transition: .6s; left: 80%; width: 0px;";
                    this.spans[1].style = "transition: .6s; transform: rotate(45deg);";
                    this.spans[2].style = "transition: .6s; transform: rotate(135deg);";
                    this.spans[3].style = "transition: .6s; left: 20%; width: 0px;";
                } else {
                    this.spans[0].style = "transition: all .6s; left: 20%; width: 60%;";
                    this.spans[1].style = "transition: all .6s; transform: rotate(0deg);";
                    this.spans[2].style = "transition: all .6s; transform: rotate(0deg);";
                    this.spans[3].style = "transition: all .6s; left: 20%; width: 60%;";
                    this.timeout = setTimeout(
                        function () {
                            this.spans[0].removeAttribute("style");
                            this.spans[1].removeAttribute("style");
                            this.spans[2].removeAttribute("style");
                            this.spans[3].removeAttribute("style");
                        }.bind(this),
                        800
                    );
                }
                break;
            case "pushReverse":
                if ("open" === this.state) {
                    this.spans[0].style = "transition: .6s; left: 20%; width: 0px;";
                    this.spans[1].style = "transition: .6s; transform: rotate(-45deg);";
                    this.spans[2].style = "transition: .6s; transform: rotate(-135deg);";
                    this.spans[3].style = "transition: .6s; left: 80%; width: 0px;";
                } else {
                    this.spans[0].style = "transition: all .6s; left: 20%; width: 60%;";
                    this.spans[1].style = "transition: all .6s; transform: rotate(0deg);";
                    this.spans[2].style = "transition: all .6s; transform: rotate(0deg);";
                    this.spans[3].style = "transition: all .6s; left: 20%; width: 60%;";
                    this.timeout = setTimeout(
                        function () {
                            this.spans[0].removeAttribute("style");
                            this.spans[1].removeAttribute("style");
                            this.spans[2].removeAttribute("style");
                            this.spans[3].removeAttribute("style");
                        }.bind(this),
                        800
                    );
                }
                break;
            case "async":
                if ("open" === this.state) {
                    this.timeout = setTimeout(
                        function () {
                            this.spans[0].style = "top: 48%; transform: rotate(-225deg);";
                        }.bind(this),
                        200
                    );
                    this.spans[1].style = "width: 0px;";
                    this.spans[2].style = "width: 0px; left: 80%";
                    this.spans[3].style = "top: 48%; transform: rotate(225deg);";
                } else {
                    this.spans[0].removeAttribute("style");
                    this.spans[1].removeAttribute("style");
                    this.spans[2].removeAttribute("style");
                    this.timeout = setTimeout(
                        function () {
                            this.spans[3].removeAttribute("style");
                        }.bind(this),
                        200
                    );
                }
                break;
            case "asyncReverse":
                if ("open" === this.state) {
                    this.spans[0].style = "top: 48%; transform: rotate(225deg);";
                    this.spans[1].style = "width: 0px;";
                    this.spans[2].style = "width: 0px; left: 80%";
                    this.timeout = setTimeout(
                        function () {
                            this.spans[3].style = "top: 48%; transform: rotate(-225deg);";
                        }.bind(this),
                        200
                    );
                } else {
                    this.timeout = setTimeout(
                        function () {
                            this.spans[0].removeAttribute("style");
                        }.bind(this),
                        200
                    );
                    this.spans[1].removeAttribute("style");
                    this.spans[2].removeAttribute("style");
                    this.spans[3].removeAttribute("style");
                }
                break;
            case "spin":
                if ("open" === this.state) {
                    this.$.contSpans.style = "transition: all .5s; transform: rotate(90deg);";
                    this.spans[1].style = "width: 0px;";
                    this.spans[2].style = "width: 0px; left: 80%;";
                    this.timeout = setTimeout(
                        function () {
                            this.spans[0].style = "top: 48%; transform: rotate(45deg);";
                            this.spans[3].style = "top: 48%; transform: rotate(135deg);";
                        }.bind(this),
                        200
                    );
                } else {
                    this.$.contSpans.style = "transition: all .5s; transform: rotate(0deg);";
                    this.spans[0].removeAttribute("style");
                    this.spans[3].removeAttribute("style");
                    this.timeout = setTimeout(
                        function () {
                            this.spans[1].removeAttribute("style");
                            this.spans[2].removeAttribute("style");
                            this.$.contSpans.removeAttribute("style");
                        }.bind(this),
                        200
                    );
                }
                break;
            case "spinReverse":
                if ("open" === this.state) {
                    this.$.contSpans.style = "transition: all .5s; transform: rotate(-90deg);";
                    this.spans[1].style = "width: 0px;";
                    this.spans[2].style = "width: 0px; left: 80%;";
                    this.timeout = setTimeout(
                        function () {
                            this.spans[0].style = "top: 48%; transform: rotate(-45deg);";
                            this.spans[3].style = "top: 48%; transform: rotate(-135deg);";
                        }.bind(this),
                        200
                    );
                } else {
                    this.$.contSpans.style = "transition: all .5s; transform: rotate(0deg);";
                    this.spans[0].removeAttribute("style");
                    this.spans[3].removeAttribute("style");
                    this.timeout = setTimeout(
                        function () {
                            this.spans[1].removeAttribute("style");
                            this.spans[2].removeAttribute("style");
                            this.$.contSpans.removeAttribute("style");
                        }.bind(this),
                        200
                    );
                }
                break;
        }
    }
}
window.customElements.define("aw-menu-button", AwMenuButton);
