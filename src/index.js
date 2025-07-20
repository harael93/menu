import './styles.css';

const tabLayout = {
  tabs: [
    {
      id: 'home',
      text: 'Home',
      content: `
        <h2>Welcome to Home</h2>
        <p>This is the home page content. Welcome to our website!</p>
      `
    },
    {
      id: 'menu',
      text: 'Menu',
      content: `
        <h2>Our Menu</h2>
        <ul>
          <li>Appetizers</li>
          <li>Main Courses</li>
          <li>Desserts</li>
          <li>Beverages</li>
        </ul>
      `
    },
    {
      id: 'contact',
      text: 'Contact',
      content: `
        <h2>Contact Us</h2>
        <p>Email: info@example.com</p>
        <p>Phone: (555) 123-4567</p>
        <p>Address: 123 Main St, City, State 12345</p>
      `
    }
  ],
  
  activeTab: 'home',
  
  init() {
    this.createTabContainer();
    this.createTabButtons();
    this.createContentContainer();
    this.showTab(this.activeTab);
  },
  
  createTabContainer() {
    this.tabContainer = document.createElement('div');
    this.tabContainer.className = 'tab-container';
    document.body.appendChild(this.tabContainer);
  },
  
  createTabButtons() {
    this.tabNav = document.createElement('div');
    this.tabNav.className = 'tab-nav';
    
    this.tabs.forEach(tab => {
      const button = document.createElement('button');
      button.className = 'tab-button';
      button.textContent = tab.text;
      button.dataset.tabId = tab.id;
      
      button.addEventListener('click', () => {
        this.showTab(tab.id);
      });
      
      this.tabNav.appendChild(button);
    });
    
    this.tabContainer.appendChild(this.tabNav);
  },
  
  createContentContainer() {
    this.contentContainer = document.createElement('div');
    this.contentContainer.className = 'tab-content';
    this.tabContainer.appendChild(this.contentContainer);
  },
  
  showTab(tabId) {
    // Update active tab
    this.activeTab = tabId;
    
    // Update button states
    const buttons = this.tabNav.querySelectorAll('.tab-button');
    buttons.forEach(button => {
      if (button.dataset.tabId === tabId) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    // Update content
    const activeTabData = this.tabs.find(tab => tab.id === tabId);
    if (activeTabData) {
      this.contentContainer.innerHTML = activeTabData.content;
    }
  },
  
  addTab(id, text, content) {
    this.tabs.push({ id, text, content });
    // Refresh the tab layout
    this.tabContainer.innerHTML = '';
    this.createTabButtons();
    this.createContentContainer();
    this.showTab(this.activeTab);
  },
  
  removeTab(tabId) {
    this.tabs = this.tabs.filter(tab => tab.id !== tabId);
    if (this.activeTab === tabId && this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id;
    }
    // Refresh the tab layout
    this.tabContainer.innerHTML = '';
    this.createTabButtons();
    this.createContentContainer();
    if (this.tabs.length > 0) {
      this.showTab(this.activeTab);
    }
  }
};

// Initialize the tab layout
tabLayout.init();