import React, { useState, useEffect, createContext, useReducer, useContext } from 'react';
import CustomerService from '../Services/CustomerService';
import ProductService from '../Services/ProductService';
import OrderService from '../Services/OrderService';
import AtomQuantity from '../Components/Atoms/Atom-quantity';
import Barcode from '../Components/Assets/barcode.svg'
import { AiOutlinePlus, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import AtomProduct from '../Components/Atoms/Atom-product';
import { CartContext } from '../Components/Context/CartContext';

const OrderCreate = () => {

  const {beijinho} = useContext(CartContext)
  console.log(`Beijinho da view ${beijinho}`)

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [orders, setOrders] = useState([]);

  const customerService = new CustomerService();
  const productService = new ProductService();
  const orderService = new OrderService();

  const toggleLoading = () => {
    if (loading == false)
      setLoading(loading);
    else
      setLoading(!loading);
  }

  // const [data, setData] = useState({
  //   cd_pedido: "1",
  //   cd_produto: "2",
  //   qt_itens: "1"
  // });

  // const createReducer = (product)=>{
  //   return (state, action)=>{
  //     const productList = product;

  //     switch(action.type){
  //       case "AddToCart":
  //         if(productList.find(product => product.cd_produto === action.playload.cd_produto)){
  //           let newState1 = [...state];
            
  //           if(newState1.find(item=> item.product.cd_produto === action.playload.cd_produto)){
  //             console.log(`Foi incrementado um item em ${action.playload.cd_produto}`);
  //             ++newState1.find(item=> item.product.cd_produto === action.playload.cd_produto)
  //               .quantity;
  //           }
  //           else{
  //             console.log(`Enviado para o carrinho o produto ${action.playload.cd_produto}`);
  //             newState1.push({
  //               cd_pedido: orders.cd_pedido,
  //               cd_produto: productList.find(
  //                 product => product.cd_produto === action.playload.cd_produto
  //               ),
  //               qt_itens: 1
  //             });
  //           }
  //           return newState1;
  //         }
  //         return state;
  //       case "SubtractFromCart":
  //         let newState2 = [...state];

  //         if(newState2.find(item => item.product.cd_pedido === action.playload.cd_produto)){
  //           const item = state.find(
  //             item => item.product.cd_pedido === action.playload.cd_pedido
  //           );
            
  //           if(item.quantity < 2){
  //             console.log(`Foi removido do carrinho o item ${action.playload.cd_produto}`);
  //             newState2 = newState2.filter(
  //               cartItem => cartItem.product.cd_pedido != item.product.cd_pedido
  //             );
  //           }
  //           else{
  //             console.log(`Decrementado do carrinho o produto ${action.playload.cd_produto}`);
  //             ++newState2.find(item=> item.product.cd_produto === action.playload.cd_produto)
  //               .quantity;
  //           }
  //           return newState2;
  //         }
  //     }
  //   }
  // }

  useEffect(() => {
    async function loadCustomer() {
      setCustomer(await customerService.getCustomer(2));
      toggleLoading();
    }
    async function loadProducts() {
      setProducts(await productService.getAllProduct());
      console.log(products)
      toggleLoading();
    }
    async function loadAllOrders() {
      setOrders(await orderService.getAllOrders());
      toggleLoading();
    }

    loadCustomer();
    loadProducts();
    loadAllOrders();

  }, []);

  return (
    <section>
      {loading ?
        <p>Carregando...</p>
        :
        <div>
          <div className='d-flex justify-content-between'>
            {/* <!-- em nome do usu??rio vai como exemplo: Jo??o Silva. Local de inser????o din??mica --> */}
            <div className=' p-3 m-3'>
              <span className='usuario px-3 py-3'>Usu??rio</span>
              {customer &&
                <span className='user px-3 py-3'>{customer.no_usuario}</span>
              }
            </div>
            {/* <!-- local de inser????o din??mica --> */}
            <div className=' p-3 m-3'><span className='data px-3 py-3'>Data: 22 de Abril 15:31 PM</span></div>
          </div>
          {/* <!-- Container da tabela de produtos --> */}
          <section className='container-fluid px-5 text-center tabela-produtos'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Item</th>
                  <th scope='col'>Quantidade</th>
                  <th scope='col'>Valor unit??rio</th>
                  <th scope='col'>Valor total do item</th>
                  <th scope='col'>Adicionar a sacola</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) =>
                  <AtomProduct product = { item } />
                )}
              </tbody>
            </table>
            {/* <!-- Exibir apenas se o delivery n??o estiver funcionando --> */}
            {/* <!-- <div className='n-funcioando d-flex justify-content-center flex-column text-center'>
        <div className=''>Lamento mas n??o estamos funcionando no momento.</div>
        <div className=' font-italic'>Hor??rio de funcionamento: Das 15:00 ??s 23:59.</div>
      </div> --> */}

            {/* <!-- Exibir apenas se n??o tiver nenhum produto cadastrado no bd ou a quantidade de todos os produtos estiver zerada --> */}
            {/* <!-- <div className='n-funcioando d-flex justify-content-center flex-column text-center'>
        <div className=''>Lamento mas n??o h?? produtos em estoque no momento.</div>
        <div className=' font-italic'>Volte mais tarde.</div>
      </div> --> */}
          </section>

          {/* <!-- Container com tabela de desconto, bot??o de cadastro de endere??o e bot??o de pagamento --> */}
          <section className='col-12 px-5 d-flex align-items-center'>

            <div className='col-6 pl-5 text-center'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Desconto</th>
                    <th scope='col'>%</th>
                    <th scope='col'>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <!-- Local de inser????o din??mica de descontos (dados inseridos at?? o momento meramente ilustrativos) --> */}
                  <tr>
                    <td>Compra acima de 20,00 R$</td>
                    <td>5%</td>
                    <td>00,00R$</td>
                  </tr>
                  {/* <!-- Linha delimitante indicando o final da tabela --> */}
                </tbody>
              </table>
            </div>

            {/* <!-- div com bot??es --> */}
            <div className='col-4 mx-auto d-flex justify-content-around'>
              {/* <!-- bot??o que ativa o modal cadastrar endere??o --> */}
              <button type='button' className='btn btn-secondary' data-toggle='modal' data-target='#modalEndereco'>Cadastrar endere??o</button>
              <button type='button' className='btn btn-dark'>Pagar</button>
            </div>

          </section>

          {/* <!-- Modal - Cadastrar endere??o --> */}
          <div className='modal fade' id='modalEndereco' tabIndex='-1' role='dialog' aria-labelledby='modalEnderecoTitle' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='modalEnderecoTitle'>Cadastrar endere??o</h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <form>
                    <div className='form-row'>
                      <div className='form-group col-md-6'>
                        <label htmlFor='inputPassword4'>Endere??o</label>
                        <input type='text' className='form-control' id='endereco' placeholder='Rua 1, 123' />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='inputAddress2'>Complemento</label>
                      <input type='text' className='form-control' id='inputAddress2' placeholder='Ao lado da Pra??a 1' />
                    </div>
                    <div className='form-row'>
                      <div className='form-group col-md-6'>
                        <label htmlFor='inputCidade'>cidade</label>
                        <input type='text' className='form-control' id='inputCidade' placeholder='Alegre' />
                      </div>
                      <div className='form-group col-md-4'>
                        <label htmlFor='inputEstado'>Estado</label>
                        <select id='inputEstado' className='form-control'>
                          <option defaultValue={null}>Estado...</option>
                          <option>ES</option>
                          <option>MG</option>
                          <option>RJ</option>
                          <option>SP</option>
                        </select>
                      </div>
                      <div className='form-group col-md-2'>
                        <label htmlFor='inputCep'>CEP</label>
                        <input type='text' className='form-control' id='inputCep' placeholder='29500-000' />
                      </div>
                    </div>
                    <p className='text-danger'>Voc?? esqueceu de preencher campos obrigat??rios.</p>
                    <div className='modal-footer'>
                      <button type='submit' className='btn btn-primary'>Cadastrar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>


          {/* <!-- Modal - Erro ao adicionar (bot??o verde) --> */}
          <div className='modal fade' id='naoadicionado' tabIndex='-1' role='dialog' aria-labelledby='naoadicionadoTitle' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='naoadicionadoTitle'>Falha ao adicionar ?? sacola</h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  Desculpe, a quantidade que voc?? pediu deste item n??o tem em estoque.<br />
                  {/* <!-- neste span ficar?? a quantidade de itens, deste produto pedido, em estoque --> */}
                  <em>Quantidade em estoque: <span>0</span></em>
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-dismiss='modal'>Escolher outra op????o</button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal - Adicionado com sucesso (bot??o verde) --> */}
          <div className='modal fade' id='adicionadocomsucesso' tabIndex='-1' role='dialog' aria-labelledby='adicionadocomsucessoTitle' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='adicionadocomsucessoTitle'>Pedido adicionado ?? sacola</h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  Seu pedido foi adicionado na sua sacola.
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-dismiss='modal'>Voltar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </section>
  );
}

export default OrderCreate;