import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Produit from "../Produit/Produit";
import styles from "./ListProduits.module.css";

const ListProduits = () => {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState();
  const [produits, setProduits] = useState([])

  useEffect(()=>{
    const getData = async ()=> {
        const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
        return res.data;
    }

    getData().then(cats => setCategories(cats));

  }, []);

  useEffect(() => {
    const getData = async ()=> {
        let api = ''
        if(categorie==0)
            api = 'https://api.escuelajs.co/api/v1/products';
        else 
            api = 'https://api.escuelajs.co/api/v1/categories/'+categorie+'/products';
        
        const res = await axios.get(api);

        return res.data;
    }

    getData().then(prods => setProduits(prods));
  }, [categorie]);

  return (
    <div>
      <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
        <option value={0}>Tous les produits</option>
        {categories.map((item) => (
          <option value={item.id} key={item.id}>{item.name}</option>
        ))}
      </select>

    <div className={styles.list}>
      {
        produits.length===0 ? <h1>Pas de produits</h1> : 
        produits.map(p => <Produit produit={p} />)
      }
      </div>
    </div>
  );
};

export default ListProduits;
