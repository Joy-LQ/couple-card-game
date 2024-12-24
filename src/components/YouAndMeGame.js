import React, { useState } from 'react';
import { Shuffle, RotateCcw, Heart, HelpCircle, X, Lock } from 'lucide-react';

const GAME_PASSWORD = "lovegame2024";

const defaultCards = {
  male: [
    { id: 1, number: 1, content: "用一条丝巾蒙住你爱人的双眼,让他们坐在扶手椅上,上身保持裸露。轻轻按摩他们的肩膀,偶尔将手滑向胸部的部位。", difficulty: 1 },
    { id: 2, number: 2, content: "让你的爱人穿着内衣立在面前。从脚踝开始,温柔地一路亲吻到达唇边。动作要缓慢,细腻地探索每一寸肌肤。", difficulty: 1 },
    { id: 3, number: 3, content: "用一条眼罩蒙住你爱人的双眼,用指尖在他们的腹部缓缓描绘出这样的字句:'You are gorgeous', 'I find you attractive', and 'I want you'. 他们需要猜出每一个短语", difficulty: 1 },
    { id: 4, number: 4, content: "用激烈的亲吻掠夺你爱人的双唇,双手紧捉他们丰满的臀部将他们拉近。尽情挥洒你的爱意和占有欲,让彼此都沉沦在这片刻的狂乱之中。", difficulty: 1 },
    { id: 5, number: 5, content: "从你爱人的脖颈开始,用温软的舌尖轻轻舔舐,缓缓向下探索至脊背的曲线,最后回到颈部。让你的爱意随着舌尖的游走而泛滥成灾,让彼此都沉浸其中。", difficulty: 1 },
    { id: 6, number: 6, content: "你的爱人正穿着内衣站在你面前。用你灵活的双唇,轻轻咬住她的衣衫边缘,慢慢脱下它,却不能让你的嘴唇接触到她的肌肤。在这个过程中,你们的视线都紧紧交织在一起。", difficulty: 2 },
    { id: 7, number: 7, content: "温柔地为你的爱人解开衣衫,双手接过他们的手腕,轻轻地将他们的双手交叠在身后。然后,用你温暖的双唇,在他们的腹部印下一串柔软的亲吻。让你的爱意透过每一个吻烙印在他们的肌肤上。", difficulty: 2 },
    { id: 8, number: 8, content: "为你的爱人蒙上柔软的眼罩,双手轻轻探入他们的衣襟之中。小心翼翼地解开他们的内衣,用指尖轻抚他们敏感的肌肤,描绘出每一处曲线。让你的爱意透过指尖传递到他们的身心。", difficulty: 2 },
    { id: 9, number: 9, content: "露出你爱人的乳房，并让它们面向你坐下。舔她们的乳房，就像在阳光下融化的冰淇淋一样。", difficulty: 2 },
    { id: 10, number: 10, content: "露出爱人的臀部，将其放在膝盖上，面朝下。将油倒在上面并进行感官按摩", difficulty: 2 },
    { id: 11, number: 11, content: "露出伴侣的乳房，并将其面向您坐下。捏并扭转他们的乳头（就像打开水龙头一样）时，请看着他们的眼睛。当疼痛变得难以忍受时，让他们阻止你。并且不要超出这个范围。", difficulty: 3 },
    { id: 12, number: 12, content: "给爱人的脚洗澡、按摩，然后一一吸吮他们的脚趾，并用感官舔舐他们的足弓。", difficulty: 3 },
    { id: 13, number: 13, content: "脱掉你爱人的内裤并吮吸他们的阴蒂，如果他们要求更温柔地开始啃咬。", difficulty: 3 },
    { id: 14, number: 14, content: "脱掉爱人的内裤，用手指夹住他们的​​阴唇。沿着它们的长度追踪，但不要接触其他任何地方。", difficulty: 3 },
    { id: 15, number: 15, content: "抓住你爱人的头发，让他们保持头部不动，这样他们就必须看着你的眼睛。将另一只手伸进他们的内裤里。将手指放入其中 10 次——不多也不少——大声数数。", difficulty: 3 }
    { id: 16, number: 16, content: "当你的爱人穿着内衣时，热情地亲吻他们并抓住他们的臀部。粗暴地握住他们，并将双手滑入他们的臀部之间。在你的伴侣允许的范围内走得尽可能远", difficulty: 3 }
    { id: 17, number: 17, content: "你们俩都穿好衣服了。与您的伴侣弯腰在桌子上模拟充满活力的后入式性爱。通过把他们弄脏并打屁股来增加趣味性。", difficulty: 3 },
    { id: 18, number: 18, content: "将手指放入爱人体内，找到他们的 G 点。你的爱人应该引导你，并在你找到它时告诉你。", difficulty: 3 },
    { id: 19, number: 19, content: "即兴创作以下色情场景：你的爱人假装生病，请医生上门拜访。", difficulty: 3 },
    { id: 20, number: 20, content: "即兴创作以下色情场景：你是一名警察。对你的爱人进行严格的搜身，尽管他们有负罪感，但仍试图对你甜言蜜语.", difficulty: 3 },
    { id: 21, number: 21, content: "即兴创作以下色情场景：你是一个自信的仿生人，会不惜一切代价与你的爱人为所欲为。", difficulty: 3 },
    { id: 22, number: 22, content: "即兴创作以下色情场景：你是一个对观众有好感的脱衣舞娘。为他们奉献出最好的表演", difficulty: 3 },
    { id: 23, number: 23, content: "你的爱人会给你上一课，告诉你他们喜欢如何被抚摸下面，告诉你该怎么做。练习他向你展示的每个动作", difficulty: 3 },
    { id: 24, number: 24, content: "面对面，每个人都将一只手放入对方的内衣内。当你们看着对方的眼睛时互相自慰。", difficulty: 3 },
    { id: 25, number: 25, content: "将爱人的阴蒂含在嘴里，然后将几根手指放入下体。如果他们想让你走得更远，就必须在你的手指上自己上下移动身体.", difficulty: 3 },
    { id: 26, number: 26, content: "将双手涂上润滑剂，并将一只手放在大腿上，手掌向上。你的伴侣必须脱掉内裤，在你的手上摩擦以取悦自己。", difficulty: 3 },
    { id: 27, number: 27, content: "感性地清洗爱人最私密的部位。轻轻地拍干并亲吻它们.", difficulty: 3 },
    { id: 28, number: 28, content: "戴上眼罩，坐在椅子上，让你的爱人将你的双手绑在背后。你的爱人将他们的骨盆靠近你的嘴。舔并亲吻任何靠近的东西.", difficulty: 3 },
    { id: 29, number: 29, content: "露出你爱人的臀部，将他们放在你的膝盖上，让他们的臀部翘起。抚摸他们的臀部并打他们的屁股。测试他们的疼痛阈值，一旦疼痛变得太严重就停止.", difficulty: 3 }
    { id: 30, number: 30, content: "咬你爱人的耳朵，对他们说脏话——准确地告诉他们你想对他们做什么。尽你所能！", difficulty: 2 },
    { id: 31, number: 31, content: "为你的爱人表演脱衣舞表演。用你的衣服爱抚他们的身体，或者戏弄地把衣服扔向他们", difficulty: 2 },
    { id: 32, number: 32, content: "坐在椅子上，将你的爱人抱在你身上，紧紧抓住他们的骨盆。用他们的胯部摩擦你的胯部并模拟做爱.", difficulty: 2 },
    { id: 33, number: 33, content: "让你的爱人脸朝下躺在床上，轻轻地、慢慢地将指甲滑过他    们裸露的腿的背面.", difficulty: 2 },
    { id: 34, number: 34, content: "让你的爱人穿上衣服，弯腰在桌子上，抓住他们的头发，然后在你负责的地方模拟运动狗狗式性爱。", difficulty: 2 },
    { id: 35, number: 35, content: "戴上眼罩。你的爱人握住你的手，用它们来爱抚自己。关注他们所做的每一个动作并记住它们以供下次使用", difficulty: 2 },
    { id: 36, number: 36, content: "不使用舌头对你的爱人进行口交。只需用你的嘴捂住他们的内衣.", difficulty: 2 },
    { id: 37, number: 37, content: "用你的嘴抚摸爱人臀部的曲线。这样做 10 次。如果你愿意，就用你的舌头，保持有趣，并按照你的爱人的意愿走多远.", difficulty: 3 },
    { id: 38, number: 38, content: "蒙住你爱人的眼睛，在他们赤裸的大腿内侧弹琴（音乐由你决定），非常接近但不接触他们的私密区域", difficulty: 2 },
    { id: 39, number: 39, content: "蒙住爱人的眼睛，隔着衣服抚摸他们。时不时地将几根手指滑入他们的内裤中。您不得将任何手指放入阴部.", difficulty: 2 },
    { id: 40, number: 40, content: "蒙住你爱人的眼睛，并在他们的乳房上进行感官刺激.", 注意爱人的脖子和耳朵。给他们一些温柔的爱咬（谨慎或其他方式）并吮吸他们的耳垂.", difficulty: 2 }
    { id: 41, number: 41, content: "用你的大腿，隔着爱人的衣服摩擦他们的胯部。尝试不同的压力和动作.", difficulty: 2 },
    { id: 42, number: 42, content: "用手指在爱人的大腿上和内裤上上下滑动。不允许您进行任何其他类型的移动", difficulty: 2 },
    { id: 43, number: 43, content: "将手指滑过她们的内裤腰带，靠近但不要触及她们最脆弱的区域。", difficulty: 2 },
    { id: 44, number: 44, content: "当你的爱人穿着内衣时，将你的手指滑入内衣下，敏感地抚摸他们的臀部", difficulty: 2 },
  ],
female: [
    { id: 1, number: 1, content: "蒙住爱人的眼睛，亲吻他们的脖子，时不时地轻咬他们的耳垂.", difficulty: 1 },
    { id: 2, number: 2, content: "蒙住爱人的眼睛，贪婪地吮吸他们的手指.", difficulty: 1 },
    { id: 3, number: 3, content: "将爱人的双手绑在背后并亲吻他们的上半身.", difficulty: 1 },
    { id: 4, number: 4, content: "在爱人的脖子上系一条领带，用力拉动，将他们拉向你，然后热情地亲吻他们.", difficulty: 1 },
    { id: 5, number: 5, content: "热情地亲吻你的爱人，将你的舌头伸进他们的嘴里。这样，轻咬他们的嘴唇.", difficulty: 1 },
    { id: 6, number: 6, content: "即兴创作以下色情场景：你是一位魅力十足的首席执行官的私人助理，你真的很喜欢他。他愿意，那就勾引他吧。", difficulty: 2 },
    { id: 7, number: 7, content: "蒙住你爱人的眼睛并对他们的私处吹气。你不准碰它们.", difficulty: 2 },
    { id: 8, number: 8, content: "蒙住你爱人的眼睛，然后在他们旁边脱衣服。靠近他们的脸、嘴或耳朵取悦自己 - 选择权在你.", difficulty: 2 },
    { id: 9, number: 9, content: "将爱人的睾丸握在手中，轻轻按摩，间断地轻轻拉扯它们.", difficulty: 2 },
    { id: 10, number: 10, content: "为你的爱人表演脱衣舞，并诱惑地向他们扔你的衣服.", difficulty: 2 },
    { id: 11, number: 11, content: "当你们俩都穿上衣服时，让你的伴侣俯身在桌子上，模拟充满活力、运动的后入式性爱。用打屁股来让事情变得更有趣.", difficulty: 3 },
    { id: 12, number: 12, content: "用您喜欢的涂抹酱或液体（例如果酱或巧克力）覆盖您爱人最敏感的部位，然后将其舔掉。这样做几次.", difficulty: 3 },
    { id: 13, number: 13, content: "性感地清洗你爱人的阴部，然后用你的舌头舔舐和挑逗它。最后将它们深深地放入嘴中，同时摩擦他的蛋蛋.", difficulty: 3 },
    { id: 14, number: 14, content: "吸吮爱人的睾丸，并将他们的阴部握在手中，进行感性按摩", difficulty: 3 },
    { id: 15, number: 15, content: "坐在椅子上，让爱人将你的双手绑在背后。你的爱人将他们的骨盆靠近你的嘴。舔并亲吻任何靠近的东西", difficulty: 3 },
    { id: 16, number: 16, content: "给你的爱人戴上眼罩，用手指轻拍他们的私处根部，但这个阶段不要触摸.", difficulty: 2 },
    { id: 17, number: 17, content: "使用一滴润滑剂，按摩、抚摸、挠痒痒、爱抚爱人胯部的每一个部位.", difficulty: 2 },
    { id: 18, number: 18, content: "舔、咬、亲吻和吸吮爱人的乳头.", difficulty: 2 },
    { id: 19, number: 19, content: "即兴创作以下色情场景：你是一个真正的魅魔。你的爱人很害羞。说服他和你一起睡。你需要有多放荡就有多放荡.", difficulty: 2 },
    { id: 20, number: 20, content: "即兴创作以下色情场景：你是一名女警察。对你的爱人进行彻底的搜身，尽管他们有负罪感，但仍试图对你甜言蜜语.", difficulty: 2 },
    { id: 21, number: 21, content: "一次一个地抚摸你爱人的（干净的）脚趾，就好像你在抚摸他的阴部一样.", difficulty: 2 },
    { id: 22, number: 22, content: "当你的爱人穿着内衣时，当你爱抚他们的臀部时，热情地亲吻他们。紧紧握住，将指甲深深地扎进去，然后轻轻地拍打它们.", difficulty: 2 },
    { id: 23, number: 23, content: "将爱人的手放在你的手中，并将其放在他们的私处。让他们慢慢地、感性地告诉你并向你展示他们真正喜欢什么，从而引导你.", difficulty: 2 },
    { id: 24, number: 24, content: "站在你爱人的身后，隔着他们的裤子爱抚他们。然后将手短暂地伸进去，然后残酷地抽离.", difficulty: 2 },
    { id: 25, number: 25, content: "即兴创作以下色情场景：你在药店，发现了一位性感的药剂师。你厚颜无耻地询问他们关于安全套的建议，并说服他你需要练习戴上一个.", difficulty: 2 },
    { id: 26, number: 26, content: "握住爱人的手，用它们爱抚自己。如果你愿意的话，可以将你自己的手指和他们的手指放入你的体内.", difficulty: 2 },
    { id: 27, number: 27, content: "蒙住爱人的眼睛，让他面对着你坐下，随着你选择的音乐起舞，将自己贴在他身上.", difficulty: 2 },
    { id: 28, number: 28, content: "买一个你们都喜欢外观的性玩具。如果你不能立即做到这一点，请承诺稍后接受.", difficulty: 2 },
    { id: 29, number: 29, content: "即兴创作以下色情场景：你是一个声名狼藉的富有的夫人。你对其中一位顾客产生热情。尽一切努力让这个赌客和你一起过夜.", difficulty: 2 },
    { id: 30, number: 30, content: "当你吸吮爱人的乳头时并为他手淫。只要你的爱人允许你尽全力.", difficulty: 2 },
    { id: 31, number: 31, content: "坐在椅子上，让爱人将你的双手绑在背后。你的爱人将他们的骨盆靠近你的嘴。舔并亲吻任何靠近的东西.", difficulty: 3 },
    { id: 32, number: 32, content: "用你的嘴抚摸爱人臀部的曲线。如果你愿意的话，用你的舌头做这个10次。保持有趣并按照你的爱人的意愿进行.", difficulty: 3 },
    { id: 33, number: 33, content: "你的爱人会给你一个教学，告诉你他们如何喜欢他们的阴部被爱抚，告诉你该怎么做。练习他们向你展示的每个动作.", difficulty: 3 },
    { id: 34, number: 34, content: "将你的舌头从爱人的屁股上移到他们的蛋蛋上。 10次​​，不多不少.", difficulty: 3 },
    { id: 35, number: 35, content: "当你爱抚他们的睾丸时，你的爱人会握住他们的阴茎并自慰。如果你愿意的话，也可以用你的舌头。但是，你不能碰你爱人的阴部.", difficulty: 3 },
    { id: 36, number: 36, content: "你的舌头在你爱人的阴茎上上下滑动。时不时地停下来，特别注意使用舌尖.", difficulty: 3 },
    { id: 37, number: 37, content: "戴上眼罩，从镜子中让你的身体与你爱人的身体平行，舔并吮吸他的下身。让他抱着你的头来引导你.", difficulty: 3 },
    { id: 38, number: 38, content: "暴露你爱人的臀部，将他们放在你的膝盖上，让他们的臀部翘起。轻轻地抚摸他们的脸颊，然后粗暴地打他们的屁股。测试他们的疼痛阈值，一旦疼痛变得难以忍受就停止.", difficulty: 3 },
    { id: 39, number: 39, content: "你的爱人拍摄你自慰的视频。使其尽可能具有吸引力.", difficulty: 3 },
    { id: 40, number: 40, content: "在你们的乳房之间涂上润滑剂，以便你的爱人可以自慰.", difficulty: 3 },
    { id: 41, number: 41, content: "将手放入内衣内自慰，看着爱人的眼睛.", difficulty: 3 },
    { id: 42, number: 42, content: "即兴创作以下色情场景：你的爱人是一名患者，最近性生活过多，身体有些疼痛。作为医生，你检查他们的身体，触摸它比你需要的更多。你发现他们很有吸引力，所以滥用职权.", difficulty: 3 },
    { id: 43, number: 43, content: "即兴创作以下色情场景：你是一名色情电影导演，正在面试寻找一个屏幕合作伙伴。向你的爱人询问你认为需要的问题。并务必要求进行现场测试.", difficulty: 3 },
    { id: 44, number: 44, content: "通过沿着你的爱人的下身摩擦你赤裸、润滑的臀部来对你的爱人进行自慰。同时取悦自己.", difficulty: 3 },
  ]
};

// Rest of the component code remains the same...

const YouAndMeGame = () => {
  // 状态定义
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [gameState, setGameState] = useState('initial');
  const [currentTurn, setCurrentTurn] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [scores, setScores] = useState({ male: 0, female: 0 });
  const [vetoCount, setVetoCount] = useState({ male: 1, female: 1 });
  const [showRules, setShowRules] = useState(false);
  const [usedCards, setUsedCards] = useState({ male: [], female: [] });

  // 函数定义
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === GAME_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

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
      setVetoCount(prev => ({ ...prev, [gender]: prev[gender] - 1 }));
      setCurrentCard(null);
      setIsFlipped(false);
    }
  };

  const getDifficultyHearts = (difficulty) => {
    return Array(difficulty).fill('❤️').join('');
  };

  // 密码验证界面
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
                  <div className="relative w-full h-full transition-all duration-500"
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
              <li>每张卡牌都有1颗心的难度等级</li>
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
