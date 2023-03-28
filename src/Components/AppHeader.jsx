import { ShoppingCartOutlined } from '@ant-design/icons';
import {  Menu, Typography,Badge, Drawer, Table, InputNumber, Button, Form, Input, Select, Checkbox, message} from 'antd'
import React,{useState,useEffect} from 'react'
import {AiFillHome} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { getCart } from './Apis/Api';


function AppHeader() {
    const navigate=useNavigate();

    
    const onMenuClick=(item)=>{
        navigate(`/${item.key}`)


    };
  return (
    <div className='AppHeader'>
      
   <Menu
   className='appMenu'
   onClick={onMenuClick}
   
   mode='horizontal'
    items={[
    {
 
    label:<AiFillHome/>,
    key:"",

   },
   {
    label:"Men",
    key:"men",
    children:[
        {
        label:"Men's Shoes",
        key:"mens-shoes",
        },
        {
            label:"Men's shirts",
            key:"mens-shirts",
        },
        {
            label:"Men's Watches",
            key:"men's-watches",
            }

]

   },
   {
    label:"Women",
    key:"women",
    children:[
        {
        label:"Women's Dresses",
        key:"womens-dresses",
        },
        {
            label:"Women's Shoes",
            key:"womens-shoes",
        },
        {
            label:"Women's Watches",
            key:"womens-watches",
            },
            {
                label:"Women's bags",
                key:"womens-bags",
                },
                {
                    label:"Women's Jewelery",
                    key:"womens-jewellery",
                    }
        
    

]


   },
   {
    label:"Fragrances",
    key:"fragrances"

   },
   ]}
   />
  
   <Typography.Title style={{color:"brown",marginRight:"100px",fontFamily:"verdana",fontStyle:"italic"}}>Hanan Fashion</Typography.Title>
  <AppCart/>

    </div>
  )
}
function AppCart(){
    const [cartDrawer, setCartDrawer] = useState(false)
    const [checkOutDrawerOpen, setCheckOutDrawerOpen] = useState(false)
    const [cartItems, setCartItems] = useState(false)
    useEffect(() => {
     getCart().then(res=>{
     setCartItems(res.products)
     })
    }, [])
    const confirmOrder=(values)=>{
        console.log(values)
        setCartDrawer(false)
        setCheckOutDrawerOpen(false)
        message.success("Your Order has been placed successfully")
    
       

    }
    return (
        <div>
        <Badge onClick={()=>{
            setCartDrawer(true)

        }} count={cartItems.length } className='shoppingCart'>
        <ShoppingCartOutlined className='shoppingCart'/>
        </Badge>
        <Drawer open={cartDrawer} onClose={()=>{
            setCartDrawer(false)
        }}
        title="Your Cart"
        contentWrapperStyle={{width:500}}
         >
            <Table pagination={false} columns={[{
                title:'Title',
                dataIndex:"title"
            },
            {
                title:'Price',
                dataIndex:"price",
                render:(value)=>{
                    return <span>${value}</span>;
                },
            },
            {
                title:'Quantity',
                dataIndex:"quantity",
                render: (value,record)=>{
                    return <InputNumber min={0} defaultValue={value}
                    onChange={(value)=>{
                        setCartItems((pre)=>
                        pre.map((cart)=>{
                            if(record.id === cart.id){
                                cart.total=cart.price*value;
                            }
                            return cart;
                        }))
                    }}
                    ></InputNumber>;
                },
            },
            {
                title:'Total',
                dataIndex:"total",
                render:(value)=>{
                    return <span>${value}</span>;
                },
            }
        ]}
        dataSource={cartItems}
        summary={(data)=>{
            const total=data.reduce((pre,current)=>{
                return pre+current.total

            },0)
            return <span>Total:{total}</span>
        }}
            ></Table>
            <Button  onClick={()=>{
                setCheckOutDrawerOpen(true)
            }} type='primary'>Checkout your Cart</Button>
        </Drawer>
        <Drawer open={checkOutDrawerOpen} onClose={()=>{
            setCheckOutDrawerOpen(false)
        }} title="Confirm Order"
        contentWrapperStyle={{width:500}}
        >
            <Form onFinish={confirmOrder}>
                <Form.Item  rules={[{
                    required:true,
                    message:"Please enter your fullname"
                  
                }]}
                label='Full name' name='full_name' >
                    <Input placeholder='Enter your full name....'/>

                </Form.Item>
                <Form.Item
                 rules={[{
                    required:true,
                    type:"email",
                    message:"Please enter a valid  email"
                  
                }]}
                 label='Email' name='your_email'>
                    <Input placeholder='Enter your email....'/>

                </Form.Item>
                <Form.Item  rules={[{
                    required:true,
                    message:"Please enter your address"
                  
                }]}

                label='Address' name='your_address'>
                    <Input placeholder='Enter your address...'/>

                </Form.Item>
    
                <Form.Item>
                    <Checkbox defaultChecked disabled>Cash on Delivery</Checkbox>
                </Form.Item>
                <Typography.Paragraph type='secondary'>More methods coming soon</Typography.Paragraph>
                <Button type='primary' htmlType='submit'>
                    {""}
                    Confirm Order</Button>


            </Form>

        </Drawer>
        </div>

    )
}
export default AppHeader
