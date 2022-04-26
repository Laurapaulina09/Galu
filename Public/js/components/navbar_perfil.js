class CabeceraJn extends HTMLElement {
    constructor(){
      super()
      //this.shadow = this.attachShadow({mode:"open"})
    }
    static get observedAttributes(){
      return ["activo"]
    }
    get activo(){
      return this.getAttribute("activo")
    }
    connectedCallback(){
      this.render()
    }
    render(){
      this.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light sombra-nav" style="background-color:#f3f3f3">
      <div class="container container-fluid">
          <a class="navbar-brand" href="/">
              <img src="/GalúAzul.png" class="d-block" width="100px" alt="...">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <a class="nav-link fw-bold" aria-current="page" href="/">
                          <div class="d-flex ">
                              <img src="/img/obrero.png" width="35px" alt="">
                              <div class="align-self-center">
                                  Trabaja con nosotros
                              </div>
                          </div>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link fw-bold" aria-current="page" href="/QS.html">
                          <div class="d-flex ">
                              <img class="rounded-circle" id="img_jr" src="" width="35px" alt="">
                              <div class="align-self-center">
                                  Mi perfil
                              </div>
                          </div>
                      </a>

                  </li>
              </ul>
          </div>
      </div>
  </nav> `
    }
  }
  customElements.define('cabecera-jn', CabeceraJn)