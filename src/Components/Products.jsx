import { Card, List ,Image,Typography, Badge, Rate, Button, message, Spin, Select} from 'antd';

import React,{useEffect,useState} from 'react'
import { toast } from 'react-toastify';
import { addToCart, getAllproducts, getProductsByCategory } from './Apis/Api'
import { useParams } from 'react-router-dom';

function Products() {
    const [loading, setLoading] = useState(false);
    const param=useParams()
    const [items, setItems] = useState([])
    const [sortOrder, setSortOrder] = useState('az')
useEffect(()=>{
    setLoading(true);
  (param?.categoryId
      ?getProductsByCategory(param.categoryId)
      :getAllproducts()
      ).then(res=>{
        setItems(res.products);
        setLoading(false)

    });

},[param]);
const getSortedItems=()=>{
    const sortedItems=[...items]
    sortedItems.sort((a,b)=>{
        if(sortOrder==='az'){
            return a.title>b.title?1:a.title===b.title?0:-1

        }
        else if(sortOrder==='za'){
            return a.title<b.title?1:a.title===b.title?0:-1
            
        }
       else if(sortOrder==='lowHigh'){
            return a.price>b.price?1:a.price===b.price?0:-1
            
        }
        else if(sortOrder==='highLow'){
            return a.price<b.price?1:a.price===b.price?0:-1
            
        }
        

    })
    return sortedItems;

}
if(loading){
    return <Spin spinning/>
}
return <div className='productsContainer'>
    <div>
        <Typography.Text style={{display:"flex"}}>Sort Items By:</Typography.Text>
        <Select 
        style={{width:"300px",display:"flex"}}
         showSearch
         placeholder="Sort Items"
        onChange={(value)=>
            setSortOrder(value)
        }
        defaultValue={'az'}
        options={[
            {
                label:"Alphabetically a-z",
                value:'az'

            },
            {
                label:"Alphabetically z-a",
                value:'za'
                
            },
            {
                label:"Price Low to High",
                value:'lowHigh'
                
            },
            {
                label:"Price High to Low",
                value:'highLow'
                
            }
        ]}></Select>
    </div>
    <List grid={{column:3}} renderItem={(product,index)=>{
        return(
            <Badge.Ribbon className='itemCardBadge' text={`${product.discountPercentage}%off `}color='orange'>
         <Card className='itemCard' title={product.title} key={index} cover={<Image className='itemCardImage' src={product.thumbnail}/>}
         actions={[
            <Rate allowHalf disabled value={product.rating}></Rate>, <Cart item={product}/>
         ]}
         
         >
            <Card.Meta title={<Typography.Paragraph>
                Price:${product.price} {""}
                <Typography.Text delete type='danger'>${parseFloat( product.price+(
                    product.discountPercentage)/100).toFixed(2) }</Typography.Text>
            </Typography.Paragraph>}
            description={<Typography.Paragraph ellipsis={{rows:2,expandable:true,symbol:"more"}}>  {product.description}</Typography.Paragraph>}
            
            >

            </Card.Meta>
        </Card>
        </Badge.Ribbon>
        )  ;

    }} dataSource={getSortedItems()}></List>
</div>


}
const Cart=({item})=>{
    const [loading, setLoading] = useState(false)
    const addProductToCart=()=>{
        setLoading(true)
        addToCart(item.id).then(res=>{
           toast.success(`${item.title} has been added to Cart`)
           setLoading(false)
        })
    }
    return <Button onClick={()=>{
        addProductToCart()
    }} loading={loading} type='link'>Add to Cart</Button>
}

export default Products
