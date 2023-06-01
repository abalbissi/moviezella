import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComponent from "./paginationComponent";

const MoviesList = ({movies,getPage,pageCount}) => {
  return (
    <Row className="mt-3">
   {
    movies.length >= 1? (movies.map((movie)=>{
      return (
        <CardMovie key={movie.id} movie={movie}/>

      )
    })) :<h2>لا يوجد افلام</h2>
   }
   <PaginationComponent getPage={getPage} pageCount={pageCount}/>

    </Row>
  );
};

export default MoviesList;