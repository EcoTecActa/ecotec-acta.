const detail = document.getElementById('detail');
const detailContent = document.getElementById('detailContent');
const installBtn = document.getElementById('installBtn');
let deferredPrompt = null;
let score = 0, questionIndex = 0;

const content = {
 identify: `<span class="eyebrow">MISIÓN 01 · IDENTIFICA</span><h2>¿Qué objetos son residuos electrónicos?</h2><p>Son equipos que funcionan con electricidad o baterías y que ya no se necesitan, están dañados o quedaron obsoletos.</p><div class="tips-grid"><div class="tip"><b>📱 Comunicación</b>Celulares, tabletas y teléfonos.</div><div class="tip"><b>💻 Computación</b>Computadoras, teclados, ratones e impresoras.</div><div class="tip"><b>🔌 Accesorios</b>Cargadores, cables y audífonos.</div><div class="tip"><b>🔋 Energía</b>Pilas y baterías: necesitan recolección especial.</div></div><p><strong>Recuerda:</strong> no todos los aparatos se desechan igual. Consulta las indicaciones de tu localidad.</p>`,
 sort: `<span class="eyebrow">MISIÓN 02 · CLASIFICA</span><h2>¿Qué hago con cada aparato?</h2><div class="tips-grid"><div class="tip"><b>📱 Celular que aún funciona</b>Consérvalo, repáralo o dónalo si está en buenas condiciones. Borra tus datos antes de entregarlo.</div><div class="tip"><b>🔋 Pilas y baterías</b>No las mezcles con la basura común. Llévalas a un contenedor o centro de acopio autorizado.</div><div class="tip"><b>💻 Computadora dañada</b>Pregunta por programas de recolección de residuos electrónicos.</div><div class="tip"><b>🔌 Cables y cargadores</b>Guárdalos separados y consulta si tu centro de acopio los recibe.</div></div><p><strong>Importante:</strong> no abras, quemes ni desarmes aparatos o baterías. Pide ayuda a una persona adulta y utiliza centros especializados.</p>`,
 care: `<span class="eyebrow">MISIÓN 03 · CUIDA EL PLANETA</span><h2>7 acciones que sí puedes hacer</h2><ol><li>Cuida tus dispositivos para que duren más.</li><li>Repara antes de reemplazar, cuando sea seguro y posible.</li><li>Dona los aparatos que todavía funcionan.</li><li>Compra solo lo que realmente necesitas.</li><li>Entrega los residuos electrónicos en centros de acopio.</li><li>No tires pilas ni baterías a la basura común.</li><li>Comparte esta información con tu familia y escuela.</li></ol><p>En México puedes preguntar en tu municipio o consultar campañas oficiales de reciclaje electrónico para conocer fechas y ubicaciones vigentes.</p>`,
 quiz: `<span class="eyebrow">MISIÓN 04 · RETO ECOLÓGICO</span><h2>¡Pon a prueba tus conocimientos!</h2><p>Responde las preguntas y descubre cuánto sabes sobre el cuidado del planeta.</p><div id="quizArea"></div>`
};

const questions = [
 {q:'¿Qué es un residuo electrónico?',a:['Una cáscara de fruta','Un aparato eléctrico o electrónico que ya no se usa','Cualquier envase de papel'],correct:1,why:'¡Correcto! Puede ser un celular, computadora, cable o cargador que ya no se utiliza.'},
 {q:'¿Qué debemos hacer con las pilas usadas?',a:['Tirarlas al suelo','Quemarlas','Llevarlas a un punto de recolección especial'],correct:2,why:'¡Muy bien! Las pilas requieren manejo y recolección adecuados.'},
 {q:'Si un celular todavía funciona, ¿qué opción es mejor?',a:['Reutilizarlo, repararlo o donarlo','Tirarlo inmediatamente','Dejarlo en la calle'],correct:0,why:'¡Exacto! Alargar su vida útil ayuda a reducir residuos.'},
 {q:'¿Qué debemos evitar con los aparatos electrónicos?',a:['Buscar un centro de acopio','Quemarlos o desarmarlos sin preparación','Informarnos sobre su reciclaje'],correct:1,why:'¡Así es! No debemos quemarlos ni manipular sus componentes peligrosos.'},
 {q:'¿Quién puede ayudar a encontrar un lugar de reciclaje?',a:['El municipio o una campaña oficial','Un sitio sin información verificable','Nadie'],correct:0,why:'¡Correcto! Consulta fuentes oficiales y centros autorizados.'}
];

function showQuiz(){
 score=0; questionIndex=0; renderQuestion();
}
function renderQuestion(){
 const area=document.getElementById('quizArea');
 if(questionIndex>=questions.length){
   area.innerHTML=`<p class="score">¡Terminaste! Tu resultado: ${score} de ${questions.length} ⭐</p><p>${score===questions.length?'¡Excelente! Eres una persona EcoTec.': '¡Buen intento! Puedes repasar las misiones y volver a jugar.'}</p><button class="primary-btn" id="again">Jugar otra vez ↻</button>`;
   document.getElementById('again').onclick=showQuiz; return;
 }
 const q=questions[questionIndex];
 area.innerHTML=`<p class="score">Pregunta ${questionIndex+1} de ${questions.length}</p><h3>${q.q}</h3>${q.a.map((a,i)=>`<button class="quiz-option" data-answer="${i}">${a}</button>`).join('')}<p class="quiz-feedback" id="feedback"></p><button class="primary-btn" id="next" hidden>Siguiente →</button>`;
 area.querySelectorAll('[data-answer]').forEach(btn=>btn.onclick=()=>{
   area.querySelectorAll('[data-answer]').forEach(b=>b.disabled=true);
   const good=Number(btn.dataset.answer)===q.correct;
   if(good)score++;
   document.getElementById('feedback').textContent=(good?'✅ ':'💡 ')+q.why;
   document.getElementById('next').hidden=false;
 });
 document.getElementById('next').onclick=()=>{questionIndex++;renderQuestion();};
}
document.querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',()=>{
 const key=btn.dataset.open;
 detailContent.innerHTML=content[key];
 detail.hidden=false;
 if(key==='quiz')showQuiz();
 detail.scrollIntoView({behavior:'smooth',block:'start'});
}));
document.getElementById('backBtn').addEventListener('click',()=>{detail.hidden=true;document.getElementById('explora').scrollIntoView({behavior:'smooth'});});

window.addEventListener('beforeinstallprompt',e=>{
 e.preventDefault(); deferredPrompt=e; installBtn.hidden=false;
});
installBtn.addEventListener('click',async()=>{
 if(!deferredPrompt){alert('En iPhone: abre el menú Compartir de Safari y elige “Añadir a pantalla de inicio”.');return;}
 deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; installBtn.hidden=true;
});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
