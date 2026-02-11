(() => {
  // ---------- TYPEWRITER ----------
  const intro = "ถึงคุณ… คนที่น้องอยากเล่าเรื่องทั้งหมดให้ฟัง 💗";
  const typeEl = document.getElementById("typeText");
  let ti = 0;
  function type(){
    if(!typeEl) return;
    if(ti < intro.length){
      typeEl.textContent += intro[ti++];
      setTimeout(type, 40);
    }
  }
  type();

  // ---------- MUSIC (autoplay safe) ----------
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicToggle");
  let playing = false;
  if(musicBtn && music){
    musicBtn.addEventListener("click", async () => {
      try{
        if(!playing){ await music.play(); musicBtn.textContent="🔇 ปิดเพลง"; }
        else{ music.pause(); musicBtn.textContent="🎵 เปิดเพลง"; }
        playing = !playing;
      }catch(e){
        alert("กดอีกครั้งเพื่อเปิดเพลงนะ 💗 (บางเบราว์เซอร์ต้องมี interaction ก่อน)");
      }
    });
  }

  // ---------- PAGE SYSTEM (no bug) ----------
  const pages = Array.from(document.querySelectorAll(".page"));
  let current = 0;
  function goNext(){
    if(current >= pages.length-1) return;
    pages[current].classList.remove("active");
    current += 1;
    pages[current].classList.add("active");
  }
  document.querySelectorAll(".btn.next").forEach(b=>{
    b.addEventListener("click", goNext);
  });

  // ---------- GIFT BOX ----------
  const gift = document.getElementById("giftBox");
  const giftText = document.getElementById("giftText");
  const giftNext = document.getElementById("giftNext");
  if(gift){
    gift.addEventListener("click", () => {
      gift.disabled = true;
      gift.textContent = "💌 เปิดแล้ว… ความรู้สึกของน้อง";
      giftText.classList.remove("hidden");
      giftNext.classList.remove("hidden");
    });
  }

  // ---------- NO RUN (bounded) ----------
  const noBtn = document.getElementById("noBtn");
  if(noBtn){
    const parent = noBtn.closest(".card");
    const move = () => {
      const rect = parent.getBoundingClientRect();
      const maxX = rect.width - noBtn.offsetWidth - 16;
      const maxY = rect.height - noBtn.offsetHeight - 16;
      noBtn.style.position = "absolute";
      noBtn.style.left = Math.max(0, Math.random()*maxX) + "px";
      noBtn.style.top  = Math.max(0, Math.random()*maxY) + "px";
    };
    noBtn.addEventListener("mouseenter", move);
    noBtn.addEventListener("touchstart", move, {passive:true});
  }

  // ---------- YES FX (hearts explosion) ----------
  const yesBtn = document.getElementById("yesBtn");
  const canvas = document.getElementById("fx");
  const ctx = canvas.getContext("2d");
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener("resize", resize);

  function heart(x,y,s){
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(s,s);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(0,-3,-5,-3,-5,0);
    ctx.bezierCurveTo(-5,3,0,5,0,7);
    ctx.bezierCurveTo(0,5,5,3,5,0);
    ctx.bezierCurveTo(5,-3,0,-3,0,0);
    ctx.fillStyle = "#ff6aa6";
    ctx.fill();
    ctx.restore();
  }

  let particles = [];
  function burst(){
    for(let i=0;i<120;i++){
      particles.push({
        x: canvas.width/2,
        y: canvas.height/2,
        vx:(Math.random()-0.5)*6,
        vy:(Math.random()-0.7)*6,
        life: 60 + Math.random()*30,
        s: 0.8 + Math.random()*0.8
      });
    }
  }
  function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; p.life--;
      heart(p.x,p.y,p.s);
    });
    particles = particles.filter(p=>p.life>0);
    requestAnimationFrame(loop);
  }
  loop();

  if(yesBtn){
    yesBtn.addEventListener("click", ()=>{
      burst();
      setTimeout(()=> alert("เย้ 💗 ตอนนี้คุณเป็นแฟนน้องแล้วนะ!"), 400);
    });
  }

  // ---------- PARTICLES BG ----------
  const container = document.querySelector(".particles");
  if(container){
    for(let i=0;i<36;i++){
      const s = document.createElement("span");
      s.style.left = Math.random()*100 + "%";
      s.style.animationDuration = (6+Math.random()*6)+"s";
      s.style.opacity = 0.4 + Math.random()*0.6;
      container.appendChild(s);
    }
  }
})();
