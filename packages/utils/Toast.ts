class Toast {
    timer: any

    constructor() {

    }

    info(msg: string, timeout: number) {
        msg = msg || 'info';
        timeout = timeout || 2000;
        this.init(); // 显示
        this.setTime(timeout)
    }

    init() {
        clearTimeout(this.timer)
        let toast = document.getElementById('toast')
        if (toast) {
            toast.style.display = "block"
        } else {
            let div = document.createElement("div")
            div.setAttribute("id", "toast")
            document.body.appendChild(div)
        }
    }

    setTime(timeout: number) {
        this.timer = setTimeout(() => {
            let toast = document.getElementById('toast')
            if (toast) {
                toast.style.display = "none"
            }
        }, timeout)
    }
}
