import { Shuffle, RotateCcw, Heart, HelpCircle, X, Lock } from 'lucide-react';
import React, { useState } from 'react';

const GAME_PASSWORD = "lovegame2024"; // 游戏密码

// 游戏卡牌数据
const defaultCards = {
  male: [
    { id: 1, number: 1, content: "对着对方说三句甜言蜜语", difficulty: 1 },
    { id: 2, number: 2, content: "给对方一个温暖的拥抱", difficulty: 1 },
    { id: 3, number: 3, content: "用最甜蜜的语气叫对方一声宝贝", difficulty: 1 },
    { id: 4, number: 4, content: "说说和对方的第一次见面", difficulty: 1 },
    { id: 5, number: 5, content: "告诉对方今天的妆容/穿搭很好看", difficulty: 1 },
    { id: 6, number: 6, content: "分享一个你们之间的小秘密", difficulty: 2 },
    { id: 7, number: 7, content: "即兴为对方唱一首歌", difficulty: 2 },
    { id: 8, number: 8, content: "用夸张的表情说'我超级爱你'", difficulty: 2 },
    { id: 9, number: 9, content: "说出对方最吸引你的三个特点", difficulty: 2 },
    { id: 10, number: 10, content: "描述你心中对方最美的样子", difficulty: 2 }
  ],
  female: [
    { id: 1, number: 1, content: "对着对方撒个娇", difficulty: 1 },
    { id: 2, number: 2, content: "亲一下对方的脸颊", difficulty: 1 },
    { id: 3, number: 3, content: "用最可爱的表情说'我爱你'", difficulty: 1 },
    { id: 4, number: 4, content: "说说对方最近做的暖心的事", difficulty: 1 },
    { id: 5, number: 5, content: "夸夸对方今天的造型", difficulty: 1 },
    { id: 6, number: 6, content: "模仿对方的一个小动作", difficulty: 2 },
    { id: 7, number: 7, content: "说出你最难忘的一次约会", difficulty: 2 },
    { id: 8, number: 8, content: "给对方一个公主抱", difficulty: 2 },
    { id: 9, number: 9, content: "说说第一次心动的瞬间", difficulty: 2 },
    { id: 10, number: 10, content: "用夸张的动作表达爱意", difficulty: 2 }
  ]
};

const YouAndMeGame = () => {
  // 密码相关状态
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // 游戏相关状态
  const [gameState, setGameState] = useState('initial');
  const [currentTurn, setCurrentTurn] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [scores, setScores] = useState({ male: 0, female: 0 });
  const [vetoCount, setVetoCount] = useState({ male: 1, female: 1 });
  const [showRules, setShowRules] = useState(false);
  const [usedCards, setUsedCards] = useState({ male: [], female: [] });

  // 密码验证函数
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === GAME_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  // 游戏重置函数
  const resetGame = () => {
    setGameState('initial');
    setCurrentTurn(null);
    setCurrentPlayer(null);
    setCurrentCard(null);
    setIsFlipped(false);
    setScores({ male: 0, female: 0 });
    setVetoCount({ male: 1, female: 1 });
    setUsedCards({ male: [], female: [] });
  };

  // 开始游戏
  const handleStart = () => {
    const turn = ['you', 'me', '?'][Math.floor(Math.random() * 3)];
    setCurrentTurn(turn);
    setGameState('turn-select');
  };

  // 处理回合结果
  const handleTurnResult = () => {
    if (currentTurn === 'me') {
      setGameState('gender-select');
    } else {
      handleStart();
    }
  };

  // 选择性别
  const handleGenderSelect = (gender) => {
    setCurrentPlayer(gender);
    setGameState('playing');
  };

  // 获取可用卡牌
  const getAvailableCards = (gender) => {
    return defaultCards[gender].filter(card => !usedCards[gender].includes(card.id));
  };

  // 抽取卡牌
  const handleDrawCard = () => {
    const targetGender = currentPlayer === 'male' ? 'female' : 'male';
    const availableCards = getAvailableCards(targetGender);
    if (availableCards.length > 0) {
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      setCurrentCard(randomCard);
      setIsFlipped(false);
    }
  };

  // 完成任务
  const handleCompleteTask = () => {
    if (currentCard) {
      const scorer = currentPlayer;
      setScores(prev => ({
        ...prev,
        [scorer]: prev[scorer] + currentCard.difficulty
      }));

      const targetGender = currentPlayer === 'male' ? 'female' : 'male';
      setUsedCards(prev => ({
        ...prev,
        [targetGender]: [...prev[targetGender], currentCard.id]
      }));

      setCurrentCard(null);
      setIsFlipped(false);
    }
  };

  // 否决
  const handleVeto = (gender) => {
    if (vetoCount[gender] > 0) {
      setVetoCount(prev => ({ ...prev, [gender]: prev[gender] - 1 }));
      setCurrentCard(null);
      setIsFlipped(false);
    }
  };

  // 获取难度心形图标
  const getDifficultyHearts = (difficulty) => {
    return Array(difficulty).fill('❤️').join('');
  };

  // 如果未认证，显示密码输入界面
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-pink-50 p-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-8">You & Me</h1>
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-pink-500" />
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                请输入密码进入游戏
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="输入密码..."
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">密码错误，请重试</p>
            )}
            <button
              type="submit"
              className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
            >
              进入游戏
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 游戏主界面
  return (
    <div className="min-h-screen bg-pink-50 p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">You & Me</h1>

      {/* 分数显示 */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md">
        <div>男生得分: {scores.male}</div>
        <div>女生得分: {scores.female}</div>
        <div className="mt-2 text-sm">
          否决机会:<br />
          男生: {vetoCount.male} | 女生: {vetoCount.female}
        </div>
      </div>

      {/* 重置按钮 */}
      <button
        onClick={resetGame}
        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
      >
        <RotateCcw className="w-5 h-5" />
        重新开始
      </button>

      <div className="flex flex-col items-center gap-6">
        {/* 初始状态 */}
        {gameState === 'initial' && (
          <button
            onClick={handleStart}
            className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
          >
            <Shuffle className="w-5 h-5 inline mr-2" />
            开始游戏
          </button>
        )}

        {/* 回合选择 */}
        {gameState === 'turn-select' && (
          <div className="text-center">
            <div className="text-2xl mb-4">
              抽到了: {currentTurn === 'you' ? '对方' : currentTurn === 'me' ? '你' : '随机'}
            </div>
            <button
              onClick={handleTurnResult}
              className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
            >
              {currentTurn === 'me' ? '选择性别' : '继续抽取'}
            </button>
          </div>
        )}

        {/* 性别选择 */}
        {gameState === 'gender-select' && (
          <div className="text-center">
            <div className="text-xl mb-4">请选择性别:</div>
            <div className="flex gap-4">
              <button
                onClick={() => handleGenderSelect('male')}
                className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600"
              >
                男生
              </button>
              <button
                onClick={() => handleGenderSelect('female')}
                className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
              >
                女生
              </button>
            </div>
          </div>
        )}

        {/* 游戏进行中 */}
        {gameState === 'playing' && (
          <div className="flex flex-col items-center gap-4 relative">
            <div className="text-xl mb-4">
              当前回合: {currentPlayer === 'male' ? '男生' : '女生'}
            </div>

            {!currentCard && (
              <button
                onClick={handleDrawCard}
                className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
              >
                抽取卡牌
              </button>
            )}

            {currentCard && (
              <div className="flex flex-col items-center gap-4">
                <div 
                  onClick={() => !isFlipped && setIsFlipped(true)}
                  className="w-64 h-96 cursor-pointer"
                  style={{ perspective: "1000px" }}
                >
                  <div className={`relative w-full h-full transition-all duration-500`}
                       style={{ 
                         transformStyle: "preserve-3d",
                         transform: isFlipped ? "rotateY(180deg)" : ""
                       }}>
                    {/* 卡牌背面 */}
                    <div className={`absolute w-full h-full ${
                      currentPlayer === 'male' ? 'bg-pink-100' : 'bg-blue-100'
                    } rounded-xl shadow-xl p-6`}
                         style={{ backfaceVisibility: "hidden" }}>
                      <div className="text-center text-6xl font-bold">
                        {currentCard.number}
                      </div>
                      <div className="absolute bottom-6 left-6">
                        {getDifficultyHearts(currentCard.difficulty)}
                      </div>
                      <div className="absolute bottom-6 right-6">
                        {currentPlayer === 'male' ? '♀' : '♂'}
                      </div>
                    </div>

                    {/* 卡牌正面 */}
                    <div className="absolute w-full h-full bg-white rounded-xl shadow-xl p-6"
                         style={{ 
                           backfaceVisibility: "hidden",
                           transform: "rotateY(180deg)"
                         }}>
                      <div className="text-center text-xl font-bold mb-4">任务内容</div>
                      <div className="text-center text-lg px-4">
                        {currentCard.content}
                      </div>
                      <div className="absolute bottom-6 left-6">
                        {getDifficultyHearts(currentCard.difficulty)}
                      </div>
                    </div>
                  </div>
                </div>

                {isFlipped && (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleVeto('male')}
                      disabled={vetoCount.male === 0}
                      className={`px-4 py-2 rounded ${
                        vetoCount.male > 0 ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300'
      }`}
    >
      男生否决 ({vetoCount.male})
    </button>
<button
                      onClick={() => handleVeto('male')}
                      disabled={vetoCount.male === 0}
                      className={`px-4 py-2 rounded ${
                        vetoCount.male > 0 ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300'
                      }`}
                    >
                      男生否决 ({vetoCount.male})
                    </button>
                    <button
                      onClick={handleCompleteTask}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      完成任务
                    </button>
                    <button
                      onClick={() => handleVeto('female')}
                      disabled={vetoCount.female === 0}
                      className={`px-4 py-2 rounded ${
                        vetoCount.female > 0 ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300'
                      }`}
                    >
                      女生否决 ({vetoCount.female})
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 游戏规则按钮 */}
      <button
        onClick={() => setShowRules(true)}
        className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
      >
        <HelpCircle className="w-5 h-5" />
        游戏说明
      </button>

      {/* 游戏规则弹窗 */}
      {showRules && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg relative">
            <button
              onClick={() => setShowRules(false)}
              className="absolute top-4 right-4 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">游戏规则</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>游戏开始时随机抽取先手玩家</li>
              <li>抽到"我"时需要选择性别</li>
              <li>轮流抽取对方的卡牌并完成任务</li>
              <li>每张卡牌都有1-3颗心的难度等级</li>
              <li>完成任务后获得对应难度的分数</li>
              <li>每个人有1次否决对方任务的机会</li>
              <li>已完成的卡牌不会再次出现</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouAndMeGame;
