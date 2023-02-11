export class Router {
    routes = {}

    add (routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        // verificar se tem um evento, ou, pegue o evento do window //
        event = event || window.event
        event.preventDefault() // n deixa atualizar a pagina ao clicar no link //
        
        // para pegar o historico do (a) clicado //
        window.history.pushState({}, "", event.target.href)

        this.handle()
    }

    handle() {
        const { pathname } = window.location // pega o link do (/) clicado //
        const route = this.routes[pathname] || this.routes[404] // se tiver a rota clicada, mostre, se não tiver, mostra routes[404] //

        // promisses //
        fetch(route) // api para pegar a rota
        .then(data => data.text()) // vá buscar essa rota, quando concluir, execute uma função q transforma os dados em texto //
        .then(html => {
            document.querySelector('#app').innerHTML = html // por ultimo, esta função irá mostrar o html dentro da div escolhida // 
        })
    }
}