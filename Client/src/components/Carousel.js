import React from "react";

export default function Carousel() {
    return (
        <div>
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                style={{ objectFit: "contain !important" }}
            >
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-success text-white bg-success"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=700&h=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
"
                            className="d-block w-100"
                            style={{ filter: "brightness(30%)" }}
                            alt="Burger"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1661599903093-d6a159b8523b?q=80&w=700&h=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="d-block w-100"
                            style={{ filter: "brightness(30%)" }}
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?q=80&w=700&h=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="d-block w-100"
                            style={{ filter: "brightness(50%)" }}
                            alt="..."
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
