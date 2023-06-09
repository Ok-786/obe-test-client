import React, { useEffect } from 'react'

export default function ChatBot() {
    useEffect(() => {
        (function (d, m) {
            var kommunicateSettings = { "appId": "3ac40258cbc0f7b8be4bf370c2f1f7626", "popupWidget": true, "automaticChatOpenOnNavigation": true };
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }, [])

    return (
        <div></div>
    )
}
