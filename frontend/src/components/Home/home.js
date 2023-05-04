import React from "react";
import cover from "../../images/online-auctions.png"

const Home = (props)=>{
    return(
        <div>
            <img src={cover} className="d-block w-100 card-img rounded-0" alt={"online auction"}/>

            <div className={"container mt-5"}>
                <div className={"text-center mt-5"}>
                    <span className={"titles"}>Featured Auction Items</span>
                    <hr/>
                </div>

                <div className={"text-center mt-5"}>
                    <span className={"titles"}>Upcoming Online Auctions</span>
                    <hr/>
                </div>

                <div className={"text-center mt-5"}>
                    <span className={"titles"}>Top Auction Categories</span>
                    <hr/>
                </div>
            </div>

        </div>
    )
}

export default Home;