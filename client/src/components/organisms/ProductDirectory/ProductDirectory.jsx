import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { AnimatePresence } from "framer-motion";
import { RiSeedlingLine } from "react-icons/ri";
import { BiChip, BiAtom } from "react-icons/bi";

import { useSelector } from "react-redux";

import CreateForm from "./CreateForm";
import ProductCategoryCard from "../../molecules/cards/ProductCategoryCard/ProductCategoryCard";
import Modal from "../Modal/Modal";

function ProductDirectory() {
  const crops = useSelector(state => state.product.crops);
  const technologies = useSelector(state => state.product.technologies);
  const techTraits = useSelector(state => state.product.techTraits);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  }
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <AnimatePresence
        initial="none"
        exitBeforeEnter={true}
        >
        {modalIsOpen && 
          <Modal handleClose={closeModal}>
            <CreateForm handleClose={closeModal} />
          </Modal>
        }
      </AnimatePresence>
      <div className={classes.listHeader}>
        <h1 className={classes.title}>Productos</h1>
      </div>
      <section className={classes.productList}>
        <ProductCategoryCard 
          onCreateIsEnable
          categoryName="Cultivos" 
          Icon={({ className, color }) => <RiSeedlingLine className={className} color={color} />} 
          items={crops}
          setModalIsOpen={setModalIsOpen}
        />
        <ProductCategoryCard 
          categoryName="Tecnologías" 
          Icon={({ className, color }) => <BiChip className={className} color={color} />} 
          items={technologies}
        />
        <ProductCategoryCard 
          categoryName="Características tecnológicas" 
          Icon={({ className, color }) => <BiAtom className={className} color={color} />} 
          items={techTraits}
        />
      </section>
    </div>
  )
}

export default ProductDirectory;

const useStyles = createUseStyles({
  root: {
    flex: 1,
    display: "flex",
    flexFlow: "column nowrap",
    padding: "10px 20px 40px",
    overflowY: "scroll"
  },
  
  listHeader: {
    display: "flex",
    marginBottom: 10,
  },
  
  title: ({ theme }) => ({
    fontWeight: 700,
    letterSpacing: 1,
    color: theme.colors.bodyText.base
  }),

  productList: {
    display: "flex",
    flexFlow: "column",

    "& > div:not(:last-child)": {
      marginBottom: 20,
    }
  },
  
  divider: {
    width: "100%",
    borderBottom: {
      style: "solid",
      width: 1,
      color: "#7A7A7A",
    }
  },
});