// import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import Card from '../components/Card'
// // import Carousel from '../components/Carousel'
// import axios from 'axios'

// export default function Home() {
//     const [foodCat, setFoodCat] = useState([]);
//     const [foodItem, setFoodItem] = useState([]);
//     const [search, setSearch] = useState("");

//     const fetchData = async () => {
//         let response = await axios.post("https://food-delivery-application-api-lac.vercel.app/api/foodData")
//         // console.log(response.data[0], response.data[1])
//         setFoodItem(response.data[0])
//         setFoodCat(response.data[1])
//     }

//     useEffect(() => {
//         fetchData()
//     }, [])

//     return (
//         <div>
//             <div> <Navbar />  </div>
//             {/* <div> <Carousel /> </div>
//              */}
//             <div
//                 id="carouselExampleFade"
//                 className="carousel slide carousel-fade"
//                 data-bs-ride="carousel"
//                 style={{ objectFit: "contain !important" }}
//             >
//                 <div className="carousel-inner" id="carousel">
//                     <div className="carousel-caption" style={{ zIndex: "10" }}>
//                         <form className="d-flex justify-content-center" role="search">
//                             <input
//                                 className="form-control me-2"
//                                 type="search"
//                                 placeholder="Search"
//                                 aria-label="Search"
//                                 value={search}
//                                 onChange={(e) => { setSearch(e.target.value) }}
//                             />
//                             {/* <button
//                                 className="btn btn-outline-success text-white bg-success"
//                                 type="submit"
//                             >
//                                 Search
//                             </button> */}
//                         </form>
//                     </div>
//                     <div className="carousel-item active">
//                         <img
//                             src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=700&h=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// "
//                             className="d-block w-100"
//                             style={{ filter: "brightness(30%)" }}
//                             alt="Burger"
//                         />
//                     </div>
//                     <div className="carousel-item">
//                         <img
//                             src="https://plus.unsplash.com/premium_photo-1661599903093-d6a159b8523b?q=80&w=700&h=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                             className="d-block w-100"
//                             style={{ filter: "brightness(30%)" }}
//                             alt="..."
//                         />
//                     </div>
//                     <div className="carousel-item">
//                         <img
//                             src="https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?q=80&w=700&h=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                             className="d-block w-100"
//                             style={{ filter: "brightness(50%)" }}
//                             alt="..."
//                         />
//                     </div>
//                 </div>
//                 <button
//                     className="carousel-control-prev"
//                     type="button"
//                     data-bs-target="#carouselExampleFade"
//                     data-bs-slide="prev"
//                 >
//                     <span
//                         className="carousel-control-prev-icon"
//                         aria-hidden="true"
//                     ></span>
//                     <span className="visually-hidden">Previous</span>
//                 </button>
//                 <button
//                     className="carousel-control-next"
//                     type="button"
//                     data-bs-target="#carouselExampleFade"
//                     data-bs-slide="next"
//                 >
//                     <span
//                         className="carousel-control-next-icon"
//                         aria-hidden="true"
//                     ></span>
//                     <span className="visually-hidden">Next</span>
//                 </button>
//             </div>
//             <div className='container'>
//                 {
//                    foodCat && foodCat.length > 0
//                         ? foodCat.map((data, index) => {
//                             return (
//                                 <div className='row mb-3'>
//                                     <div key={index} className='fs-3 m-3'>
//                                         {data.CategoryName}
//                                     </div>
//                                     <hr />
//                                     {
//                                         foodItem.length > 0 ?
//                                             foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
//                                                 .map(filterItems => {
//                                                     return (
//                                                         <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
//                                                             <Card foodItem={filterItems}
//                                                                 options={filterItems.options[0]}

//                                                             />
//                                                         </div>
//                                                     )
//                                                 }) :
//                                             <div>no such data found</div>
//                                     }
//                                 </div>
//                             )
//                         })
//                         : ""
//                 }
//             </div>
//             <div><Footer /></div>
//         </div>
//     )
// }



import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import axios from 'axios';

export default function Home() {
    const [foodCat, setFoodCat] = useState([]); // Ensure initialized as empty array
    const [foodItem, setFoodItem] = useState([]); // Ensure initialized as empty array
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        try {
            let response = await axios.post("https://food-delivery-application-api-lac.vercel.app/api/foodData");
            // Ensure response.data is in the expected format
            if (Array.isArray(response.data) && response.data.length >= 2) {
                setFoodItem(response.data[0]); // Assuming response.data[0] is an array of food items
                setFoodCat(response.data[1]);  // Assuming response.data[1] is an array of food categories
            } else {
                console.error("Invalid response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                style={{ objectFit: "contain !important" }}
            >
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <form className="d-flex justify-content-center" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); }}
                            />
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=700&h=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

            <div className='container'>
             {
    foodCat && foodCat.length > 0
        ? foodCat.map((data, index) => (
            <div key={data.CategoryName} className='row mb-3'>
                <div className='fs-3 m-3'>
                    {data.CategoryName}
                </div>
                <hr />
                {
                    foodItem && foodItem.length > 0
                        ? foodItem.filter(item => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                            .map(filterItems => (
                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                    <Card foodItem={filterItems} options={filterItems.options[0]} />
                                </div>
                            ))
                        : <div>No such data found</div>
                }
            </div>
        )) 
        : <div>Loading categories...</div>
}

            </div>

            <Footer />
        </div>
    );
}
