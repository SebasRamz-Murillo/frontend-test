import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ShoppingCart, Menu, Search } from 'lucide-react';

const Header: FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      {/* Announcement bar with subtle animation */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 text-center text-sm font-medium animate-pulse">
        <span className="inline-flex items-center gap-2">
          Free shipping on orders over $50! 
          <span className="inline-block animate-bounce">🚚</span>
        </span>
      </div>
      
      {/* Main header with shadows and spacing */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          {/* Top section with enhanced logo and search */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-300 active:scale-95">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Shop
              </h1>
            </div>
            
            {/* Cart with enhanced hover effects */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-3 hover:bg-blue-50 rounded-full transition-all duration-300 active:scale-95">
                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>
              
              {/* Enhanced cart preview popup */}
              <div className="absolute right-0 mt-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-800">Shopping Cart</span>
                    <span className="text-sm font-medium text-blue-600">{totalItems} items</span>
                  </div>
                  
                  {cartItems.length > 0 ? (
                    <>
                      <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
                        {cartItems.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 py-3 border-t border-gray-100 group/item hover:bg-gray-50 transition-colors rounded-lg px-2">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover/item:scale-105 transition-transform"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                              <p className="text-sm text-gray-500">
                                {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-gray-800">Total:</span>
                          <span className="font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium">
                          Checkout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {['New Arrivals', 'Categories', 'Best Sellers', 'Deals', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;