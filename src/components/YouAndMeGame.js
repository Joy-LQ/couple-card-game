import React, { useState } from 'react';
import { Shuffle, RotateCcw, Heart, HelpCircle, X } from 'lucide-react';

const defaultCards = {
  male: [
    // 男生简单任务 (难度 1)
    { id: 1, number: 1, content: "对着对方说三句甜言蜜语", difficulty: 1 },
    { id: 2, number: 2, content: "给对方一个温暖的拥抱", difficulty: 1 },
    { id: 3, number: 3, content: "用最甜蜜的语气叫对方一声宝贝", difficulty: 1 },
    { id: 4, number: 4, content: "说说和对方的第一次见面", difficulty: 1 },
    { id: 5, number: 5, content: "告诉对方今天的妆容/穿搭很好看", difficulty: 1 },
    
    // 男生中等任务 (难度 2)
    { id: 6, number: 6, content: "给对方唱一首最近很喜欢的歌", difficulty: 2 },
    { id: 7, number: 7, content: "展示手机里为对方单独存的照片", difficulty: 2 },
    { id: 8, number: 8, content: "说出三个最喜欢对方的理由", difficulty: 2 },
    { id: 9, number: 9, content: "学对方说话的语气和习惯动作", difficulty: 2 },
    { id: 10, number: 10, content: "和对方玩一分钟的互相对视", difficulty: 2 },
    
    // 男生困难任务 (难度 3)
    { id: 11, number: 11, content: "即兴创作一首情诗给对方", difficulty: 3 },
    { id: 12, number: 12, content: "模仿第一次向对方表白的场景", difficulty: 3 },
    { id: 13, number: 13, content: "给对方一个公主抱", difficulty: 3 },
    { id: 14, number: 14, content: "给对方按摩肩膀三分钟", difficulty: 3 },
    { id: 15, number: 15, content: "背着对方走完一首歌的时间", difficulty: 3 },
  ],
  female: [
    // 女生简单任务 (难度 1)
    { id: 1, number: 1, content: "对着对方撒个娇", difficulty: 1 },
    { id: 2, number: 2, content: "亲一下对方的脸颊", difficulty: 1 },
    { id: 3, number: 3, content: "用最可爱的表情说'我爱你'", difficulty: 1 },
    { id: 4, number: 4, content: "说说对方最近做的暖心的事", difficulty: 1 },
    { id: 5, number: 5, content: "夸夸对方今天的造型", difficulty: 1 },
    
    // 女生中等任务 (难度 2)
    { id: 6, number: 6, content: "跳一段最近很火的舞蹈", difficulty: 2 },
    { id: 7, number: 7, content: "分享一个只告诉对方的小秘密", difficulty: 2 },
    { id: 8, number: 8, content: "模仿对方的一个小习惯", difficulty: 2 },
    { id: 9, number: 9, content: "用一句话概括对方的优点", difficulty: 2 },
    { id: 10, number: 10, content: "闭着眼睛画出对方的样子", difficulty: 2 },
    
    // 女生困难任务 (难度 3)
    { id: 11, number: 11, content: "给对方化一个可爱的妆", difficulty: 3 },
    { id: 12, number: 12, content: "即兴编一个关于对方的小故事", difficulty: 3 },
    { id: 13, number: 13, content: "用行动展示最浪漫的事", difficulty: 3 },
    { id: 14, number: 14, content: "喂对方吃一顿饭", difficulty: 3 },
    { id: 15, number: 15, content: "为对方跳一支即兴舞蹈", difficulty: 3 },
  ]
};

const YouAndMeGame = () => {
  const [gameState, setGameState] = useState('initial');
  const [currentTurn, setCurrentTurn] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [scores, setScores] = useState({ male: 0, female: 0 });
  const [vetoCount, setVetoCount] = useState({ male: 1, female: 1 });
  const [showRules, setShowRules] = useState(false);
  const [usedCards, setUsedCards] = useState({ male: [], female: [] });

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

  const handleStart = () => {
    const turn = ['you', 'me', '?'][Math.floor(Math.random() * 3)];
    setCurrentTurn(turn);
    setGameState('turn-select');
  };

  const handleTurnResult = () => {
    if (currentTurn === 'me') {
      setGameState('gender-select');
    } else {
      handleStart();
    }
  };

  const handleGenderSelect = (gender) => {
    setCurrentPlayer(gender);
    setGameState('playing');
  };

  const getAvailableCards = (gender) => {
    return defaultCards[gender].filter(card => !usedCards[gender].includes(card.id));
  };

  const handleDrawCard = () => {
    const targetGender = currentPlayer === 'male' ? 'female' : 'male';
    const availableCards = getAvailableCards(targetGender);
    if (availableCards.length > 0) {
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      setCurrentCard(randomCard);
      setIsFlipped(false);
    }
  };

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

      setCurrentPlayer(currentPlayer === 'male' ? 'female' : 'male');
      setCurrentCard(null);
      setIsFlipped(false);
    }
  };

  const handleVeto = (gender) => {
    if (vetoCount[gender] > 0) {
      setVetoCount({ ...vetoCount, [gender]: vetoCount[gender] - 1 });
      setCurrentCard(null);
      setIsFlipped(false);
    }
  };

  const getDifficultyHearts = (difficulty) => {
    return Array(difficulty).fill('❤️').join('');
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">You & Me</h1>

      {/* 状态显示 */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md">
        <div>男生得分: {scores.male}</div>
        <div>女生得分: {scores.female}</div>
        <div className="mt-2 text-sm">
          否决机会:<br />
          男生: {vetoCount.male} | 女生: {vetoCount.female}
        </div>
      </div>

      {/* 重新开始按钮 */}
      <button
        onClick={resetGame}
        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
      >
        <RotateCcw className="w-5 h-5" />
        重新开始
      </button>

      {/* 游戏流程 */}
      <div className="flex flex-col items-center gap-6">
        {gameState === 'initial' && (
          <button
            onClick={handleStart}
            className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
          >
            <Shuffle className="w-5 h-5 inline mr-2" />
            开始游戏
          </button>
        )}

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

        {gameState === 'playing' && (
          <div className="flex flex-col items-center gap-4 relative min-h-[600px]">
            <div className="text-xl mb-4">
              当前回合: {currentPlayer === 'male' ? '男生' : '女生'}
            </div>

            {/* 卡牌区域 */}
            <div className="flex justify-center gap-8 mb-20">
              {/* 男生卡牌堆 */}
              <div className="relative transform hover:scale-105 transition-transform">
                <div className="w-40 h-56 bg-blue-100 rounded-xl shadow-xl absolute" 
                     style={{ transform: 'translateY(-4px)' }} />
                <div className="w-40 h-56 bg-blue-100 rounded-xl shadow-xl absolute" 
                     style={{ transform: 'translateY(-2px)' }} />
                <div className="w-40 h-56 bg-blue-100 rounded-xl shadow-xl p-4 flex flex-col items-center justify-center">
                  <span className="font-bold">男生卡牌</span>
                  <span className="mt-2 text-sm">
                    剩余: {getAvailableCards('male').length}
                  </span>
                </div>
              </div>

              {/* 女生卡牌堆 */}
              <div className="relative transform hover:scale-105 transition-transform">
                <div className="w-40 h-56 bg-pink-100 rounded-xl shadow-xl absolute" 
                     style={{ transform: 'translateY(-4px)' }} />
                <div className="w-40 h-56 bg-pink-100 rounded-xl shadow-xl absolute" 
                     style={{ transform: 'translateY(-2px)' }} />
                <div className="w-40 h-56 bg-pink-100 rounded-xl shadow-xl p-4 flex flex-col items-center justify-center">
                  <span className="font-bold">女生卡牌</span>
                  <span className="mt-2 text-sm">
                    剩余: {getAvailableCards('female').length}
                  </span>
                </div>
              </div>
            </div>

            {/* 当前卡牌 */}
            {currentCard && (
              <div
                onClick={() => !isFlipped && setIsFlipped(true)}
                className={`absolute top-1/2 -translate-y-3/4 left-1/2 -translate-x-1/2 
                  cursor-pointer transition-all duration-1000 ${isFlipped ? 'rotate-y-180' : ''}`}
              >
                <div className="relative w-64 h-96">
                  {/* 卡片背面 */}
                  <div className={`absolute w-full h-full ${
                    currentPlayer === 'male' ? 'bg-pink-100' : 'bg-blue-100'
                  } rounded-xl shadow-xl p-6 backface-hidden`}>
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

                  {/* 卡片正面 */}
                  <div className="absolute w-full h-full bg-white rounded-xl shadow-xl p-6 backface-hidden rotate-y-180">
                    <div className="text-right text-2xl">{currentCard.number}</div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                      {currentCard.content}
                    </div>
                    <div className="absolute bottom-6 left-6">
                      {getDifficultyHearts(currentCard.difficulty)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 操作按钮 - 固定在底部 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              {!currentCard && (
                <button
                  onClick={handleDrawCard}
                  className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
                >
                  抽取卡牌
                </button>
              )}

              {isFlipped && currentCard && (
                <div className="flex gap-4">
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
          </div>
        )}
      </div>

      {/* 游戏说明按钮 */}
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
