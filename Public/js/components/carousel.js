class CarouselGalu extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.render()
      }
    render(){
        this.innerHTML =`
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="./img/slider1.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <p> Prestamos diferentes servicios para el mantenimiento, reparación y mejoras del hogar.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="./img/slider 2.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    
                    <p class="text-black">Conectamos a expertos en servicios especializados para tu hogar.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="./img/slider3.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <p>Garantizamos la calidad de los trabajos.</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>`
    }
}
customElements.define('carousel-galu', CarouselGalu)