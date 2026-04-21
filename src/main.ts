export function initApp(): void {
  const app = document.getElementById('app');

  if (!app) {
    console.error('App element not found');
    return;
  }

  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div class="max-w-5xl mx-auto">
        <!-- Header - 智慧三农服务平台 -->
        <header class="text-center mb-10">
          <!-- Logo区域 -->
          <div class="flex flex-col items-center gap-6 mb-6">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl blur-xl opacity-30 scale-110"></div>
              <img 
                src="/images/platform-logo.jpg" 
                alt="智慧三农" 
                class="relative w-32 h-32 rounded-2xl shadow-2xl object-cover ring-4 ring-white"
                style="background: linear-gradient(135deg, #10b981, #059669);"
              />
            </div>
            
            <!-- 标题区域 -->
            <div class="text-center">
              <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent mb-3">
                智慧三农服务平台
              </h1>
              <div class="flex items-center justify-center gap-3">
                <span class="h-px w-12 bg-gradient-to-r from-transparent to-emerald-400"></span>
                <p class="text-lg text-gray-600 font-medium">AI智能病虫害识别系统</p>
                <span class="h-px w-12 bg-gradient-to-l from-transparent to-emerald-400"></span>
              </div>
            </div>
          </div>
          
          <!-- 装饰性标语 -->
          <div class="flex items-center justify-center gap-2 text-sm text-emerald-600 mt-4">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>智能识别</span>
            <span class="mx-2">|</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>精准防治</span>
            <span class="mx-2">|</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>科技助农</span>
          </div>
        </header>

        <!-- Main Content -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Upload Section -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              上传图片
            </h2>
            
            <!-- Upload Area -->
            <div id="uploadArea" class="border-2 border-dashed border-emerald-300 rounded-2xl p-10 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 mb-6">
              <div id="uploadPlaceholder">
                <svg class="w-20 h-20 mx-auto text-emerald-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-gray-600 mb-2">点击或拖拽图片到此处</p>
                <p class="text-sm text-gray-400">支持 JPG、PNG、WebP 格式</p>
              </div>
              <div id="imagePreviewContainer" class="hidden">
                <img id="imagePreview" class="max-h-64 mx-auto rounded-lg shadow-md" alt="Preview" />
                <button id="removeImage" class="mt-3 text-red-500 hover:text-red-700 text-sm flex items-center justify-center mx-auto gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  移除图片
                </button>
              </div>
            </div>
            <input type="file" id="fileInput" accept="image/*" class="hidden" />

            <!-- Identify Button -->
            <button id="identifyBtn" disabled class="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>开始识别</span>
            </button>
          </div>

          <!-- Result Section -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              识别结果
            </h2>
            
            <div id="resultPlaceholder" class="h-64 flex items-center justify-center text-gray-400">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p>上传图片后显示识别结果</p>
              </div>
            </div>

            <!-- Loading State -->
            <div id="loadingState" class="hidden">
              <div class="flex flex-col items-center justify-center h-64">
                <div class="animate-spin rounded-full h-14 w-14 border-4 border-emerald-500 border-t-transparent mb-4 shadow-lg"></div>
                <p class="text-gray-600">AI 正在分析中...</p>
              </div>
            </div>

            <!-- Result Content -->
            <div id="resultContent" class="hidden">
              <div id="resultText" class="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed mb-4"></div>
              <!-- Agri-Store Location Section -->
              <div id="storeSection" class="hidden border-t pt-4 mt-4">
                <p class="text-sm text-gray-600 mb-3">查找附近农资店：</p>
                <button id="findStoreBtn" class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span id="findStoreText">定位并查找附近农资店</span>
                </button>
                <div id="storeLoading" class="hidden mt-3 text-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent mx-auto mb-2"></div>
                  <p class="text-sm text-gray-600">正在定位...</p>
                </div>
                <div id="storeList" class="hidden mt-3 space-y-2 max-h-60 overflow-y-auto"></div>
                <p id="storeError" class="hidden mt-3 text-sm text-red-500"></p>
                <p id="locationInfo" class="hidden mt-2 text-xs text-gray-500"></p>
              </div>
            </div>

            <!-- Error State -->
            <div id="errorState" class="hidden">
              <div class="flex flex-col items-center justify-center h-64 text-red-500">
                <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p id="errorMessage">识别失败，请重试</p>
              </div>
            </div>
          </div>
        </div>

        <!-- History Section -->
        <div id="historySection" class="hidden mt-8">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                历史记录
              </h2>
              <button id="clearHistoryBtn" class="text-sm text-red-500 hover:text-red-700 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                清空历史
              </button>
            </div>
            <div id="historyList" class="space-y-3 max-h-80 overflow-y-auto"></div>
            <div id="historyEmpty" class="hidden text-center py-8 text-gray-400">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>暂无历史记录</p>
            </div>
          </div>
        </div>

        <!-- Tips -->
        <div class="mt-10 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-emerald-800 mb-2 text-lg">识别小贴士</h3>
              <ul class="text-emerald-700 space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  上传清晰的植物叶片或植株照片效果更佳
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  确保图片中有明显的病虫害特征
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  建议使用自然光或均匀照明
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <footer class="mt-12 text-center">
          <div class="flex items-center justify-center gap-2 mb-3">
            <img src="/images/platform-logo.jpg" alt="Logo" class="w-8 h-8 rounded-lg" />
            <span class="font-semibold text-gray-700">智慧三农服务平台</span>
          </div>
          <p class="text-sm text-gray-500">© 2024 科技赋能农业 智慧服务三农</p>
        </footer>
      </div>
    </div>
  `;

  // Initialize interactivity
  initUploadLogic();
}

function initUploadLogic(): void {
  const uploadArea = document.getElementById('uploadArea') as HTMLDivElement;
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const uploadPlaceholder = document.getElementById('uploadPlaceholder') as HTMLDivElement;
  const imagePreviewContainer = document.getElementById('imagePreviewContainer') as HTMLDivElement;
  const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
  const removeImageBtn = document.getElementById('removeImage') as HTMLButtonElement;
  const identifyBtn = document.getElementById('identifyBtn') as HTMLButtonElement;
  const resultPlaceholder = document.getElementById('resultPlaceholder') as HTMLDivElement;
  const loadingState = document.getElementById('loadingState') as HTMLDivElement;
  const resultContent = document.getElementById('resultContent') as HTMLDivElement;
  const errorState = document.getElementById('errorState') as HTMLDivElement;
  const resultText = document.getElementById('resultText') as HTMLDivElement;
  const errorMessage = document.getElementById('errorMessage') as HTMLParagraphElement;

  let currentImageBase64: string | null = null;

  // Click to upload
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  // File selected
  fileInput.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      handleFile(file);
    }
  });

  // Drag and drop
  uploadArea.addEventListener('dragover', (e: DragEvent) => {
    e.preventDefault();
    uploadArea.classList.add('border-green-500', 'bg-green-50');
  });

  uploadArea.addEventListener('dragleave', (e: DragEvent) => {
    e.preventDefault();
    uploadArea.classList.remove('border-green-500', 'bg-green-50');
  });

  uploadArea.addEventListener('drop', (e: DragEvent) => {
    e.preventDefault();
    uploadArea.classList.remove('border-green-500', 'bg-green-50');
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  });

  // Remove image
  removeImageBtn.addEventListener('click', (e: Event) => {
    e.stopPropagation();
    resetUpload();
  });

  // Identify button
  identifyBtn.addEventListener('click', async () => {
    if (!currentImageBase64) return;
    
    showLoading();
    
    try {
      await performIdentification(currentImageBase64);
    } catch (err) {
      showError(err instanceof Error ? err.message : '识别失败，请重试');
    }
  });

  function handleFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;
      currentImageBase64 = result;
      
      // Show preview
      imagePreview.src = result;
      uploadPlaceholder.classList.add('hidden');
      imagePreviewContainer.classList.remove('hidden');
      identifyBtn.disabled = false;
      
      // Reset result area
      resultPlaceholder.classList.remove('hidden');
      resultContent.classList.add('hidden');
      errorState.classList.add('hidden');
    };
    reader.readAsDataURL(file);
  }

  function resetUpload(): void {
    currentImageBase64 = null;
    fileInput.value = '';
    uploadPlaceholder.classList.remove('hidden');
    imagePreviewContainer.classList.add('hidden');
    identifyBtn.disabled = true;
    resultPlaceholder.classList.remove('hidden');
    resultContent.classList.add('hidden');
    errorState.classList.add('hidden');
  }

  function showLoading(): void {
    resultPlaceholder.classList.add('hidden');
    resultContent.classList.add('hidden');
    errorState.classList.add('hidden');
    loadingState.classList.remove('hidden');
    identifyBtn.disabled = true;
  }

  function showResult(text: string): void {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    resultContent.classList.remove('hidden');
    resultText.textContent = text;
    identifyBtn.disabled = false;
  }

  function showError(message: string): void {
    loadingState.classList.add('hidden');
    resultContent.classList.add('hidden');
    errorState.classList.remove('hidden');
    errorMessage.textContent = message;
    identifyBtn.disabled = false;
  }

  async function performIdentification(imageBase64: string): Promise<void> {
    const response = await fetch('/api/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64 }),
    });

    if (!response.ok) {
      throw new Error('识别请求失败');
    }

    // Hide store section while processing
    storeSection.classList.add('hidden');

    // Use SSE for streaming
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('无法读取响应流');
    }

    const decoder = new TextDecoder();
    let result = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      
      // Process complete SSE events
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            // Show store section when complete
            storeSection.classList.remove('hidden');
            return;
          }
          result += data;
          // Update result in real-time (typewriter effect)
          resultText.textContent = result;
          
          // Show result container
          loadingState.classList.add('hidden');
          errorState.classList.add('hidden');
          resultContent.classList.remove('hidden');
        }
      }
    }
    // Show store section when complete
    storeSection.classList.remove('hidden');
  }

  // Agri-store location functionality
  const storeSection = document.getElementById('storeSection') as HTMLDivElement;
  const findStoreBtn = document.getElementById('findStoreBtn') as HTMLButtonElement;
  const findStoreText = document.getElementById('findStoreText') as HTMLSpanElement;
  const storeLoading = document.getElementById('storeLoading') as HTMLDivElement;
  const storeList = document.getElementById('storeList') as HTMLDivElement;
  const storeError = document.getElementById('storeError') as HTMLParagraphElement;
  const locationInfo = document.getElementById('locationInfo') as HTMLParagraphElement;

  // Find nearby stores
  findStoreBtn.addEventListener('click', async () => {
    if (!navigator.geolocation) {
      showStoreError('您的浏览器不支持定位功能');
      return;
    }

    findStoreBtn.disabled = true;
    findStoreText.textContent = '定位中...';
    storeLoading.classList.remove('hidden');
    storeError.classList.add('hidden');
    storeList.classList.add('hidden');
    locationInfo.classList.add('hidden');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        locationInfo.textContent = `当前位置：${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        locationInfo.classList.remove('hidden');
        
        await searchNearbyStores(lat, lng);
      },
      (error) => {
        hideStoreLoading();
        findStoreBtn.disabled = false;
        findStoreText.textContent = '定位并查找附近农资店';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            showStoreError('定位权限被拒绝，请在浏览器设置中允许定位');
            break;
          case error.POSITION_UNAVAILABLE:
            showStoreError('无法获取位置信息');
            break;
          case error.TIMEOUT:
            showStoreError('定位请求超时');
            break;
          default:
            showStoreError('定位失败，请重试');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });

  async function searchNearbyStores(lat: number, lng: number): Promise<void> {
    try {
      hideStoreLoading();
      findStoreBtn.disabled = false;
      findStoreText.textContent = '定位并查找附近农资店';
      
      // Show instructions for the user
      storeList.classList.remove('hidden');
      storeList.innerHTML = `
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p class="text-sm text-yellow-800 font-medium mb-2">提示：</p>
          <p class="text-sm text-yellow-700 mb-2">将为您在高德地图搜索附近的农资店...</p>
          <div class="space-y-2 mt-3">
            <a href="https://uri.amap.com/search?keyword=农资店&center=${lng},${lat}&zoom=14" target="_blank" class="block px-3 py-2 bg-green-500 text-white rounded text-sm text-center hover:bg-green-600">
              在高德地图查看附近农资店
            </a>
          </div>
          <p class="text-xs text-gray-500 mt-3">点击上方链接在高德地图应用中查看附近的农资店位置</p>
        </div>
      `;
      
    } catch (error) {
      hideStoreLoading();
      findStoreBtn.disabled = false;
      findStoreText.textContent = '定位并查找附近农资店';
      showStoreError('搜索失败，请重试');
    }
  }

  function showStoreError(message: string): void {
    storeError.textContent = message;
    storeError.classList.remove('hidden');
    storeList.classList.add('hidden');
  }

  function hideStoreLoading(): void {
    storeLoading.classList.add('hidden');
  }

  // History Management
  const HISTORY_KEY = 'disease_recognition_history';
  const MAX_HISTORY = 20;

  interface HistoryItem {
    id: string;
    image: string;
    result: string;
    time: string;
  }

  const historySection = document.getElementById('historySection') as HTMLDivElement;
  const historyList = document.getElementById('historyList') as HTMLDivElement;
  const historyEmpty = document.getElementById('historyEmpty') as HTMLDivElement;
  const clearHistoryBtn = document.getElementById('clearHistoryBtn') as HTMLButtonElement;

  function loadHistory(): HistoryItem[] {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  function saveHistory(history: HistoryItem[]): void {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history:', e);
    }
  }

  function addToHistory(image: string, result: string): void {
    const history = loadHistory();
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      image,
      result,
      time: new Date().toLocaleString('zh-CN')
    };
    history.unshift(newItem);
    if (history.length > MAX_HISTORY) {
      history.pop();
    }
    saveHistory(history);
    renderHistory();
  }

  function renderHistory(): void {
    const history = loadHistory();
    
    if (history.length === 0) {
      historySection.classList.add('hidden');
      historyEmpty.classList.remove('hidden');
      historyList.innerHTML = '';
      return;
    }

    historySection.classList.remove('hidden');
    historyEmpty.classList.add('hidden');
    
    historyList.innerHTML = history.map(item => `
      <div class="flex gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        <img src="${item.image}" alt="历史图片" class="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onclick="viewHistoryImage('${item.id}')" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-gray-500">${item.time}</span>
            <button onclick="deleteHistoryItem('${item.id}')" class="text-red-400 hover:text-red-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-700 line-clamp-2 cursor-pointer" onclick="viewHistoryResult('${item.id}')">${item.result.substring(0, 100)}${item.result.length > 100 ? '...' : ''}</p>
        </div>
      </div>
    `).join('');
  }

  (window as any).viewHistoryImage = function(id: string) {
    const history = loadHistory();
    const item = history.find(h => h.id === id);
    if (item) {
      // Show image preview
      const preview = window.open('', '_blank');
      if (preview) {
        preview.document.write(`
          <html>
            <head><title>历史图片</title></head>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f5f5f5;">
              <img src="${item.image}" style="max-width:90%;max-height:90%;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.2);" />
            </body>
          </html>
        `);
      }
    }
  };

  (window as any).viewHistoryResult = function(id: string) {
    const history = loadHistory();
    const item = history.find(h => h.id === id);
    if (item) {
      // Show result in modal
      const modal = window.open('', '_blank', 'width=600,height=400');
      if (modal) {
        modal.document.write(`
          <html>
            <head>
              <title>识别结果</title>
              <style>
                body { font-family: -apple-system, sans-serif; padding: 20px; line-height: 1.8; white-space: pre-wrap; }
              </style>
            </head>
            <body>${item.result}</body>
          </html>
        `);
      }
    }
  };

  (window as any).deleteHistoryItem = function(id: string) {
    const history = loadHistory().filter(h => h.id !== id);
    saveHistory(history);
    renderHistory();
  };

  clearHistoryBtn.addEventListener('click', () => {
    if (confirm('确定要清空所有历史记录吗？')) {
      saveHistory([]);
      renderHistory();
    }
  });

  // Update performIdentification to save history
  const originalPerform = performIdentification;
  performIdentification = async function(imageBase64: string): Promise<void> {
    let result = '';
    const tempResultText = document.getElementById('resultText') as HTMLDivElement;
    
    // Override result text update to capture result
    const observer = new MutationObserver(() => {
      result = tempResultText.textContent || '';
    });
    observer.observe(tempResultText, { childList: true, characterData: true });
    
    await originalPerform(imageBase64);
    observer.disconnect();
    
    // Save to history when identification is complete
    if (result) {
      addToHistory(imageBase64, result);
    }
  };

  // Load history on init
  renderHistory();
}
