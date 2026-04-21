export function initApp(): void {
  const app = document.getElementById('app');

  if (!app) {
    console.error('App element not found');
    return;
  }

  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <header class="text-center mb-8">
          <h1 class="text-4xl font-bold text-green-800 mb-2">
            病虫害AI识别系统
          </h1>
          <p class="text-gray-600">上传植物叶片或植株图片，AI智能识别病虫害</p>
        </header>

        <!-- Main Content -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Upload Section -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">上传图片</h2>
            
            <!-- Upload Area -->
            <div id="uploadArea" class="border-2 border-dashed border-green-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all duration-300 mb-4">
              <div id="uploadPlaceholder">
                <svg class="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <button id="identifyBtn" disabled class="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>开始识别</span>
            </button>
          </div>

          <!-- Result Section -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">识别结果</h2>
            
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
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
                <p class="text-gray-600">AI 正在分析中...</p>
              </div>
            </div>

            <!-- Result Content -->
            <div id="resultContent" class="hidden">
              <div id="resultText" class="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed"></div>
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

        <!-- Tips -->
        <div class="mt-8 bg-blue-50 rounded-xl p-4">
          <h3 class="font-semibold text-blue-800 mb-2">识别小贴士</h3>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>上传清晰的植物叶片或植株照片效果更佳</li>
            <li>确保图片中有明显的病虫害特征</li>
            <li>建议使用自然光或均匀照明</li>
          </ul>
        </div>
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

    // Use SSE for streaming
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('无法读取响应流');
    }

    const decoder = new TextDecoder();
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      result += chunk;
      // Update result in real-time (typewriter effect)
      resultText.textContent = result;
      
      // Show result container
      loadingState.classList.add('hidden');
      errorState.classList.add('hidden');
      resultContent.classList.remove('hidden');
    }
  }
}
