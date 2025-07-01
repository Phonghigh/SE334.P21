# 🚀 **KRYPT - Ứng dụng Web 3.0 Blockchain Advanced**

## 📋 **Tổng quan dự án**

**Krypt** là một ứng dụng Web 3.0 hiện đại được xây dựng trên blockchain Ethereum, cho phép người dùng gửi giao dịch ETH với thông điệp và hình ảnh GIF đi kèm. Dự án bao gồm smart contract Solidity và giao diện React với nhiều tính năng nâng cao.

## ✨ **Tính năng nổi bật**

### 🔥 **Tính năng cơ bản**
- 💸 **Gửi giao dịch ETH** với thông điệp tùy chỉnh
- 🎨 **Tích hợp GIF Giphy** dựa trên từ khóa
- 📱 **Responsive design** cho mọi thiết bị
- 🔗 **Kết nối MetaMask** để quản lý ví
- 📊 **Lịch sử giao dịch** chi tiết với Etherscan

### 🚀 **Tính năng nâng cao mới**

#### 🌐 **Network Switching**
- **Chuyển đổi mạng dễ dàng**: Ethereum Mainnet, Sepolia Testnet, Local Development
- **Tự động phát hiện mạng** hiện tại
- **Thêm mạng mới** tự động vào MetaMask

#### 🎨 **Dark/Light Mode**
- **Chuyển đổi theme** mượt mà
- **Lưu preference** trong localStorage
- **Theme-aware gradients** và colors
- **Icon animations** khi chuyển đổi

#### 🔔 **Notification System**
- **Toast notifications** cho success, error, warning, info
- **Auto-dismiss** với progress bar
- **Manual dismiss** functionality
- **Smooth animations** (fade in/out)

#### 🔍 **Advanced Transaction Filtering**
- **Quick search** theo địa chỉ, message, keyword
- **Amount range filtering** (min/max ETH)
- **Date range filtering** với date picker
- **Sort options**: Newest, Oldest, Highest Amount, Lowest Amount
- **Active filter badges** với one-click removal

#### ⛽ **Gas Fee Optimization**
- **Real-time gas price monitoring**
- **Multiple speed options**: Slow, Standard, Fast, Instant
- **Gas estimation** với safety buffer
- **USD cost calculation**
- **Network-specific optimization**

#### 🛡️ **Enhanced Error Handling**
- **User-friendly error messages**
- **Error categorization** (Wallet, Network, Transaction, etc.)
- **Automatic retry mechanism**
- **MetaMask error code handling**
- **Comprehensive error logging**

## 🛠️ **Công nghệ sử dụng**

### **Frontend**
- ⚛️ **React 18** - UI Framework
- 🎨 **Tailwind CSS** - Styling
- 🔗 **Ethers.js** - Blockchain interaction
- 📱 **Vite** - Build tool
- 🎭 **React Icons** - Icon library
- 🖼️ **Giphy API** - GIF integration

### **Backend & Blockchain**
- 🔗 **Solidity** - Smart contract language
- ⚒️ **Hardhat** - Development framework
- 🧪 **Chai & Mocha** - Testing framework
- 🌐 **Sepolia Testnet** - Test network
- 🔍 **Etherscan API** - Block explorer

## 📦 **Cài đặt và chạy dự án**

### **1. Clone repository**
```bash
git clone <repository-url>
cd project_web3.0
```

### **2. Cài đặt Smart Contract**
```bash
cd smart_contract
npm install

# Compile contract
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to local network
npx hardhat node
npx hardhat run scripts/deploy-local.js --network localhost
```

### **3. Cài đặt Frontend**
```bash
cd ../client
npm install

# Start development server
npm run dev
```

### **4. Cấu hình MetaMask**
- Cài đặt MetaMask extension
- Tạo hoặc import wallet
- Thêm Sepolia testnet:
  - Network Name: Sepolia Test Network
  - RPC URL: https://sepolia.infura.io/v3/YOUR_KEY
  - Chain ID: 11155111
  - Symbol: ETH
  - Block Explorer: https://sepolia.etherscan.io

## 🎯 **Hướng dẫn sử dụng**

### **Giao dịch cơ bản**
1. **Kết nối ví**: Click "Connect Wallet" để kết nối MetaMask
2. **Nhập thông tin**: 
   - Địa chỉ người nhận
   - Số lượng ETH
   - Từ khóa (cho GIF)
   - Thông điệp
3. **Gửi giao dịch**: Click "Send Now" và xác nhận trong MetaMask

### **Sử dụng tính năng nâng cao**

#### **🌐 Network Switching**
- Click biểu tượng network ở góc phải Navbar
- Chọn mạng mong muốn từ dropdown
- Xác nhận trong MetaMask

#### **🎨 Theme Toggle**
- Click biểu tượng sun/moon ở Navbar
- Theme sẽ chuyển đổi tự động
- Preference được lưu tự động

#### **🔍 Transaction Filtering**
- Sử dụng **Quick Search** để tìm kiếm nhanh
- Click **Filters** để mở panel lọc chi tiết
- Áp dụng các bộ lọc:
  - Amount Range (ETH)
  - Date Range
  - Address Filter
  - Sort Options
- **Active filters** hiển thị dưới dạng badges

#### **⛽ Gas Optimization**
- Hệ thống tự động estimate gas optimal
- Hiển thị multiple speed options
- Tính toán cost in USD
- Monitor gas prices real-time

## 📚 **API Documentation**

### **Smart Contract Functions**

#### **`addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword)`**
- **Mô tả**: Thêm giao dịch mới vào blockchain
- **Parameters**:
  - `receiver`: Địa chỉ người nhận
  - `amount`: Số lượng ETH (wei)
  - `message`: Thông điệp đi kèm
  - `keyword`: Từ khóa cho GIF
- **Events**: Emits `Transfer` event

#### **`getAllTransactions()`**
- **Mô tả**: Lấy tất cả giao dịch
- **Returns**: Array of transaction structs

#### **`getTransactionCount()`**
- **Mô tả**: Lấy tổng số giao dịch
- **Returns**: uint256 transaction count

### **Frontend Context API**

#### **ThemeContext**
```javascript
const { theme, toggleTheme, isDark, isLight } = useTheme();
```

#### **NotificationContext**
```javascript
const { notify } = useNotification();
notify.success("Message", "Title");
notify.error("Error message", "Error Title");
```

## 🧪 **Testing**

### **Smart Contract Tests**
```bash
cd smart_contract
npx hardhat test
```

**Test Coverage:**
- ✅ Contract deployment
- ✅ Transaction addition
- ✅ Event emission
- ✅ Data storage verification
- ✅ Edge cases (zero amounts, empty strings)

### **Frontend Testing**
```bash
cd client
npm test
```

## 🌐 **Deployment**

### **Smart Contract Deployment**

#### **Sepolia Testnet**
```bash
# Set environment variables
PRIVATE_KEY=your_private_key
ALCHEMY_API_KEY=your_alchemy_key

# Deploy
npx hardhat run scripts/deploy.js --network sepolia
```

#### **Local Development**
```bash
# Start local node
npx hardhat node

# Deploy to local
npx hardhat run scripts/deploy-local.js --network localhost
```

### **Frontend Deployment**
```bash
cd client
npm run build

# Deploy to Vercel, Netlify, or your preferred platform
```

## 🔧 **Configuration**

### **Environment Variables**

#### **Smart Contract (.env)**
```env
PRIVATE_KEY=your_metamask_private_key
ALCHEMY_API_KEY=your_alchemy_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

#### **Frontend (.env)**
```env
VITE_GIPHY_API_KEY=your_giphy_api_key
VITE_CONTRACT_ADDRESS=deployed_contract_address
```

## 🚨 **Security & Best Practices**

### **Smart Contract Security**
- ✅ **Reentrancy protection** với function modifiers
- ✅ **Access control** cho admin functions
- ✅ **Input validation** cho tất cả parameters
- ✅ **Event logging** cho transparency
- ✅ **Gas optimization** để tiết kiệm chi phí

### **Frontend Security**
- ✅ **Input sanitization** 
- ✅ **XSS protection**
- ✅ **Private key không bao giờ expose**
- ✅ **HTTPS enforcement**
- ✅ **Error handling** comprehensive

### **Best Practices**
- 🔒 **Không share private keys**
- 🧪 **Test trên testnet trước**
- 💰 **Kiểm tra gas fees trước khi gửi**
- 🔍 **Verify contract trên Etherscan**
- 📝 **Backup seed phrases**

## 🎨 **UI/UX Features**

### **Responsive Design**
- 📱 **Mobile-first approach**
- 💻 **Desktop optimization**
- 🖥️ **Tablet compatibility**
- ⚡ **Fast loading times**

### **Animations & Interactions**
- 🎭 **Smooth transitions**
- ✨ **Hover effects**
- 📱 **Touch-friendly interactions**
- 🎨 **Loading states**

### **Accessibility**
- ♿ **WCAG compliant**
- 🎯 **Keyboard navigation**
- 📢 **Screen reader support**
- 🎨 **High contrast support**

## 🔄 **Có thể cải thiện**
- [x] ✅ **Network switching** - Hoàn thành
- [x] ✅ **Gas fee optimization** - Hoàn thành
- [x] ✅ **Notification system** - Hoàn thành
- [x] ✅ **Enhanced error messages** - Hoàn thành
- [x] ✅ **Transaction filtering** - Hoàn thành
- [x] ✅ **Dark/Light mode toggle** - Hoàn thành

### **Future Enhancements**
- [ ] 🔄 **Transaction history pagination**
- [ ] 💾 **Offline mode support**
- [ ] 🌍 **Multi-language support**
- [ ] 📊 **Analytics dashboard**
- [ ] 🔔 **Push notifications**
- [ ] 🎮 **Gamification elements**

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Support & Contact**

- 📧 **Email**: your-email@example.com
- 🐦 **Twitter**: @your-twitter
- 💼 **LinkedIn**: your-linkedin
- 🌐 **Website**: your-website.com

## 🙏 **Acknowledgments**

- **Ethereum Foundation** for blockchain technology
- **OpenZeppelin** for security standards
- **Hardhat team** for development tools
- **React community** for frontend framework
- **Tailwind CSS** for styling utilities

---

**⭐ Nếu project này hữu ích, hãy star repository để support tác giả!**
