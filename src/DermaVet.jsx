/**
 * DermaVet – Sistema de Gestión Veterinaria (Prototipo completo)
 * ──────────────────────────────────────────────────────────────
 * Vistas: Dashboard, Clientes, Mascotas, Citas, Productos,
 *         Inventario, Facturación, Reportes, Recordatorios, Configuración
 * Funciones: Agregar, Editar, Eliminar en todas las vistas principales
 */

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DATOS INICIALES
// ─────────────────────────────────────────────────────────────────────────────

const DATOS_CLIENTES = [
  { id:1, nombre:"María Fernández",  email:"maria.fernandez@email.com",  tel:"+56 9 1234 5678", direccion:"Av. Principal 123" },
  { id:2, nombre:"Carlos Ramírez",   email:"carlos.ramirez@email.com",   tel:"+56 9 2345 6789", direccion:"Calle 2 #456"     },
  { id:3, nombre:"Ana Torres",       email:"ana.torres@email.com",       tel:"+56 9 3456 7890", direccion:"Carrera 5 #789"   },
  { id:4, nombre:"Jorge Valenzuela", email:"jorge.valenzuela@email.com", tel:"+56 9 4567 8901", direccion:"Cra 10 #321"      },
  { id:5, nombre:"Lucía Contreras",  email:"lucia.contreras@email.com",  tel:"+56 9 5678 9012", direccion:"Av. Norte 654"    },
];

const DATOS_MASCOTAS = [
  { id:"001", nombre:"Luna",     especie:"Perro", raza:"Bulldog Francés", sexo:"Hembra", fecha_nacimiento:"2021-03-15", peso:10.5, cliente:"Ana Torres",       alergias:"Polen, polvo",       enfermedades:"Ninguna",         emoji:"🐶" },
  { id:"002", nombre:"Max",      especie:"Gato",  raza:"Gato Persa",      sexo:"Macho",  fecha_nacimiento:"2022-07-20", peso:4.2,  cliente:"Carlos Ríos",      alergias:"Ninguna",            enfermedades:"Asma leve",       emoji:"🐱" },
  { id:"003", nombre:"Rocky",    especie:"Perro", raza:"Labrador",        sexo:"Macho",  fecha_nacimiento:"2019-11-05", peso:28.0, cliente:"María Gómez",      alergias:"Ciertos alimentos",  enfermedades:"Displasia",       emoji:"🐕" },
  { id:"004", nombre:"Mimi",     especie:"Gato",  raza:"Siamés",          sexo:"Hembra", fecha_nacimiento:"2020-05-10", peso:3.8,  cliente:"Lucía Fernández",  alergias:"Ninguna",            enfermedades:"Ninguna",         emoji:"🐈" },
  { id:"005", nombre:"Toby",     especie:"Perro", raza:"Cocker",          sexo:"Macho",  fecha_nacimiento:"2023-01-25", peso:9.1,  cliente:"Jorge Ramírez",    alergias:"Ninguna",            enfermedades:"Ninguna",         emoji:"🐶" },
  { id:"006", nombre:"Whiskers", especie:"Gato",  raza:"Angora",          sexo:"Hembra", fecha_nacimiento:"2018-09-30", peso:4.5,  cliente:"Paula Martínez",   alergias:"Medicamentos AINES", enfermedades:"Hipertiroidismo", emoji:"🐱" },
];

const DATOS_CITAS = [
  { id:1, fecha:"2024-06-15", hora:"09:00", mascota:"Luna",     cliente:"Ana Torres",       vet:"Dra. María López",      estado:"Programada", motivo:"Control Dermatológico" },
  { id:2, fecha:"2024-06-15", hora:"10:30", mascota:"Max",      cliente:"Carlos Ríos",      vet:"Dr. Jorge Medina",      estado:"Programada", motivo:"Alergias"              },
  { id:3, fecha:"2024-06-15", hora:"14:00", mascota:"Rocky",    cliente:"María Gómez",      vet:"Dra. Patricia Sánchez", estado:"Asistida",   motivo:"Revisión General"      },
  { id:4, fecha:"2024-06-16", hora:"08:30", mascota:"Mimi",     cliente:"Lucía Fernández",  vet:"Dra. María López",      estado:"Programada", motivo:"Vacunación"            },
  { id:5, fecha:"2024-06-16", hora:"11:00", mascota:"Toby",     cliente:"Jorge Ramírez",    vet:"Dr. Jorge Medina",      estado:"Cancelada",  motivo:"Control Dermatológico" },
  { id:6, fecha:"2024-06-17", hora:"10:00", mascota:"Whiskers", cliente:"Paula Martínez",   vet:"Dra. Patricia Sánchez", estado:"Programada", motivo:"Revisión General"      },
];

const DATOS_PRODUCTOS = [
  { id:1, nombre:"Shampoo Dermacalm",        categoria:"Higiene",      actual:5,  minimo:10, precio:15000, estado:"Crítico" },
  { id:2, nombre:"Crema Hidratante PetSkin",  categoria:"Dermatología", actual:8,  minimo:15, precio:22000, estado:"Bajo"    },
  { id:3, nombre:"Solución Otológica",        categoria:"Medicamento",  actual:12, minimo:20, precio:18000, estado:"Bajo"    },
  { id:4, nombre:"Suplemento Omega 3",        categoria:"Nutrición",    actual:25, minimo:30, precio:12000, estado:"Normal"  },
  { id:5, nombre:"Antipulgas Plus",           categoria:"Antiparasitario",actual:3,minimo:10, precio:9000,  estado:"Crítico" },
];

const DATOS_VETERINARIOS = [
  { id:1, nombre:"Dra. María López",      especialidad:"Dermatología",  telefono:"+56 9 1111 2222", email:"maria.lopez@dermavet.com",      disponible:true  },
  { id:2, nombre:"Dr. Jorge Medina",      especialidad:"Medicina General",telefono:"+56 9 3333 4444",email:"jorge.medina@dermavet.com",     disponible:true  },
  { id:3, nombre:"Dra. Patricia Sánchez", especialidad:"Cirugía",       telefono:"+56 9 5555 6666", email:"patricia.sanchez@dermavet.com", disponible:false },
];

const DATOS_HISTORIALES = [
  { id:1, mascota:"Luna",     cita_id:1, fecha:"2024-06-15", vet:"Dra. María López",      diagnostico:"Dermatitis atópica leve",      tratamiento:"Champú medicado 2x/semana + Omega 3", receta:"Prednisolona 5mg c/12h x 7 días",  temperatura:38.5, peso_registrado:10.2, observaciones:"Paciente colaboradora. Mejoría esperada en 2 semanas." },
  { id:2, mascota:"Rocky",    cita_id:3, fecha:"2024-06-15", vet:"Dra. Patricia Sánchez", diagnostico:"Displasia de cadera grado II", tratamiento:"Fisioterapia + antiinflamatorios",    receta:"Meloxicam 1mg/kg/día x 10 días",   temperatura:38.8, peso_registrado:27.5, observaciones:"Recomendar reducción de peso gradual." },
  { id:3, mascota:"Whiskers", cita_id:6, fecha:"2024-06-17", vet:"Dra. Patricia Sánchez", diagnostico:"Control hipertiroidismo",      tratamiento:"Continuación de metimazol",           receta:"Metimazol 2.5mg c/12h",            temperatura:38.2, peso_registrado:4.3,  observaciones:"Valores tiroideos estables. Control en 3 meses." },
];

const DATOS_SERVICIOS = [
  { id:1, nombre:"Consulta General",        categoria:"Consulta",      descripcion:"Revisión clínica completa del paciente",            precio_base:35000,  duracion:30,  activo:true  },
  { id:2, nombre:"Consulta Dermatológica",   categoria:"Consulta",      descripcion:"Diagnóstico y tratamiento de enfermedades de piel", precio_base:55000,  duracion:45,  activo:true  },
  { id:3, nombre:"Vacunación",               categoria:"Prevención",    descripcion:"Aplicación de vacunas según esquema",              precio_base:25000,  duracion:20,  activo:true  },
  { id:4, nombre:"Desparasitación",          categoria:"Prevención",    descripcion:"Tratamiento antiparasitario interno y externo",     precio_base:20000,  duracion:15,  activo:true  },
  { id:5, nombre:"Baño Medicado",            categoria:"Estética",      descripcion:"Baño terapéutico con champú medicado",             precio_base:40000,  duracion:60,  activo:true  },
  { id:6, nombre:"Cirugía Menor",            categoria:"Cirugía",       descripcion:"Procedimientos quirúrgicos menores con anestesia",  precio_base:150000, duracion:120, activo:true  },
  { id:7, nombre:"Control Nutricional",      categoria:"Nutrición",     descripcion:"Evaluación y plan de alimentación personalizado",   precio_base:30000,  duracion:30,  activo:true  },
  { id:8, nombre:"Limpieza Dental",          categoria:"Odontología",   descripcion:"Profilaxis dental con ultrasonido",                precio_base:80000,  duracion:60,  activo:false },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATOS INICIALES — FACTURAS
// ─────────────────────────────────────────────────────────────────────────────
const DATOS_FACTURAS = [
  {
    id: "F-001", fecha: "2024-06-15", cliente: "Ana Torres", mascota: "Luna",
    items: [
      { tipo: "servicio", nombre: "Consulta Dermatológica", cantidad: 1, precio_unit: 55000 },
      { tipo: "producto", nombre: "Shampoo Dermacalm",      cantidad: 2, precio_unit: 15000 },
    ],
    metodo_pago: "Efectivo", estado: "Pagada", notas: "",
  },
  {
    id: "F-002", fecha: "2024-06-15", cliente: "Carlos Ríos", mascota: "Max",
    items: [
      { tipo: "servicio", nombre: "Consulta General", cantidad: 1, precio_unit: 35000 },
    ],
    metodo_pago: "Tarjeta", estado: "Pendiente", notas: "Pago pendiente confirmación",
  },
  {
    id: "F-003", fecha: "2024-06-16", cliente: "María Gómez", mascota: "Rocky",
    items: [
      { tipo: "servicio", nombre: "Cirugía Menor",  cantidad: 1, precio_unit: 150000 },
      { tipo: "producto", nombre: "Meloxicam 1mg",  cantidad: 1, precio_unit: 8000 },
    ],
    metodo_pago: "Transferencia", estado: "Pagada", notas: "",
  },
  {
    id: "F-004", fecha: "2024-06-17", cliente: "Lucía Fernández", mascota: "Mimi",
    items: [
      { tipo: "servicio", nombre: "Vacunación", cantidad: 1, precio_unit: 25000 },
    ],
    metodo_pago: "Efectivo", estado: "Anulada", notas: "Cliente no asistió",
  },
  {
    id: "F-005", fecha: "2024-06-17", cliente: "Paula Martínez", mascota: "Whiskers",
    items: [
      { tipo: "servicio", nombre: "Consulta General",          cantidad: 1, precio_unit: 35000 },
      { tipo: "producto", nombre: "Suplemento Omega 3",        cantidad: 2, precio_unit: 12000 },
      { tipo: "producto", nombre: "Crema Hidratante PetSkin",  cantidad: 1, precio_unit: 22000 },
    ],
    metodo_pago: "Transferencia", estado: "Pagada", notas: "",
  },
];

const IVA_PORCIENTO  = 19;
const METODOS_PAGO   = ["Efectivo", "Tarjeta", "Transferencia"];
const ESTADOS_FACTURA = ["Pendiente", "Pagada", "Anulada"];

function calcularTotalesFactura(items) {
  const subtotal = items.reduce((acc, it) => acc + it.cantidad * it.precio_unit, 0);
  const iva      = Math.round(subtotal * IVA_PORCIENTO / 100);
  const total    = subtotal + iva;
  return { subtotal, iva, total };
}

// ─────────────────────────────────────────────────────────────────────────────
// DATOS INICIALES — INVENTARIO
// ─────────────────────────────────────────────────────────────────────────────
const DATOS_INVENTARIO = DATOS_PRODUCTOS.map((p, i) => ({
  id:          p.id,
  nombre:      p.nombre,
  categoria:   p.categoria,
  tipo:        "Medicamento",
  actual:      p.actual,
  minimo:      p.minimo,
  precio:      p.precio,
  vencimiento: ["2028-08-01","2028-06-20","2028-01-15","2027-12-31","2025-05-10"][i] || "",
  lote:        `L-00${p.id}`,
  proveedor:   ["LabVet S.A.","PharmaVet","MedAnimal","NutriPet","LabVet S.A."][i] || "—",
  notas:       p.estado === "Crítico" ? "⚠️ Stock crítico" : "",
}));

const TIPOS_PRODUCTO    = ["Medicamento", "Alimento", "Accesorio", "Insumo", "Otro"];
const CATEGORIAS_INV    = ["Higiene", "Dermatología", "Medicamento", "Nutrición", "Antiparasitario", "Insumo", "Otro"];
const DATOS_MOVIMIENTOS = [
  { id:1, producto_id:1, tipo:"Entrada",  cantidad:10, fecha:"2024-06-01", responsable:"Admin", motivo:"Compra proveedor" },
  { id:2, producto_id:5, tipo:"Salida",   cantidad:4,  fecha:"2024-06-10", responsable:"Dra. María López", motivo:"Uso en consulta" },
  { id:3, producto_id:3, tipo:"Entrada",  cantidad:20, fecha:"2024-06-12", responsable:"Admin", motivo:"Compra proveedor" },
  { id:4, producto_id:9, tipo:"Salida",   cantidad:2,  fecha:"2024-06-14", responsable:"Dr. Jorge Medina", motivo:"Uso en consulta" },
  { id:5, producto_id:2, tipo:"Ajuste",   cantidad:-3, fecha:"2024-06-15", responsable:"Admin", motivo:"Corrección de inventario" },
];

const CATEGORIAS_SERVICIO = ["Consulta","Prevención","Estética","Cirugía","Nutrición","Odontología","Laboratorio","Otro"];

const ESTADOS_CITA = ["Programada","Asistida","Cancelada"];
const ESPECIALIDADES = ["Dermatología","Medicina General","Cirugía","Nutrición","Oftalmología"];
const CATEGORIAS = ["Higiene","Dermatología","Medicamento","Nutrición","Antiparasitario"];

// ─────────────────────────────────────────────────────────────────────────────
// COLORES
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  verde:"#1a4731", verdeClaro:"#e8f5ee", verdeLink:"#1a6b40",
  blanco:"#ffffff", fondo:"#f5f6fa", borde:"#e5e7eb",
  textoSec:"#6b7280", rojo:"#c0392b", rojoClaro:"#fce8e8",
};

const BADGE = {
  Perro:        {bg:"#e8f5ee",color:"#1a4731"}, Gato:        {bg:"#e8f0fb",color:"#2c5f9e"},
  Crítico:      {bg:"#fce8e8",color:"#c0392b"}, Bajo:        {bg:"#fef8e7",color:"#b7860b"},
  Normal:       {bg:"#e8f5ee",color:"#1a6b40"}, Programada:  {bg:"#e8f5ee",color:"#1a6b40"},
  Asistida:     {bg:"#e8f0fb",color:"#2c5f9e"}, Cancelada:   {bg:"#fce8e8",color:"#c0392b"},
  Disponible:   {bg:"#e8f5ee",color:"#1a6b40"}, "No disponible":{bg:"#fce8e8",color:"#c0392b"},
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTES BASE
// ─────────────────────────────────────────────────────────────────────────────

const Badge = ({texto}) => {
  const e = BADGE[texto]||{bg:"#f3f4f6",color:"#374151"};
  return <span style={{display:"inline-block",padding:"2px 10px",borderRadius:12,fontSize:11,fontWeight:500,background:e.bg,color:e.color}}>{texto}</span>;
};

const Avatar = ({emoji,iniciales,bgColor=C.verdeClaro,textColor=C.verde}) => (
  <div style={{width:30,height:30,borderRadius:"50%",background:bgColor,color:textColor,
    display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:emoji?16:11,fontWeight:500,flexShrink:0}}>
    {emoji||iniciales}
  </div>
);

const Btn = ({children,onClick,type="button",color=C.verde,bg=C.verde,outline=false}) => (
  <button type={type} onClick={onClick} style={{padding:"7px 14px",
    background:outline?C.blanco:bg, color:outline?color:"#fff",
    border:`1px solid ${color}`,borderRadius:8,fontSize:12,cursor:"pointer",
    display:"flex",alignItems:"center",gap:5}}>
    {children}
  </button>
);

const BtnIcono = ({children,onClick,title,bgColor=C.rojoClaro,color=C.rojo}) => (
  <button onClick={onClick} title={title} style={{padding:"4px 8px",background:bgColor,
    color,border:`1px solid ${color}`,borderRadius:6,fontSize:12,cursor:"pointer",margin:"0 2px"}}>
    {children}
  </button>
);

const Input = ({label,name,value,onChange,type="text",opciones=null,required=false,full=true}) => (
  <div style={{marginBottom:12,width:full?"100%":"auto"}}>
    {label && <label style={{fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:3}}>
      {label}{required&&<span style={{color:C.rojo}}> *</span>}
    </label>}
    {opciones
      ? <select name={name} value={value} onChange={onChange} required={required}
          style={{width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13}}>
          <option value="">Seleccionar...</option>
          {opciones.map(o=><option key={o}>{o}</option>)}
        </select>
      : <input type={type} name={name} value={value} onChange={onChange} required={required}
          style={{width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,boxSizing:"border-box"}} />
    }
  </div>
);

const Modal = ({titulo,children,onCerrar,ancho=480}) => (
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",
    display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
    <div style={{background:C.blanco,borderRadius:16,padding:24,width:ancho,
      maxWidth:"92vw",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.2)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:16,fontWeight:600,color:C.verde}}>{titulo}</h2>
        <button onClick={onCerrar} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.textoSec}}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

const TablaCabecera = ({cols}) => (
  <thead>
    <tr style={{background:C.verde}}>
      {cols.map((c,i)=><th key={i} style={{textAlign:"left",padding:"9px 10px",fontWeight:500,
        color:"rgba(255,255,255,0.9)",whiteSpace:"nowrap",fontSize:12}}>{c}</th>)}
    </tr>
  </thead>
);

const FilaVacia = ({cols,msg="No hay registros"}) => (
  <tr><td colSpan={cols} style={{textAlign:"center",padding:32,color:C.textoSec}}>{msg}</td></tr>
);

const Paginacion = ({actual,total}) => (
  <div style={{padding:"10px 14px",borderTop:`0.5px solid ${C.borde}`,
    fontSize:12,color:C.textoSec,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <span>Mostrando {actual} de {total} registros</span>
  </div>
);

const PanelHeader = ({icono,titulo,onVerTodos}) => (
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
    <div style={{display:"flex",alignItems:"center",gap:6,fontSize:14,fontWeight:500}}>
      <span>{icono}</span>{titulo}
    </div>
    {onVerTodos&&<span onClick={onVerTodos} style={{fontSize:12,color:C.verdeLink,cursor:"pointer"}}>Ver todos →</span>}
  </div>
);

// Formulario reutilizable con dos columnas
const FormGrid = ({children}) => (
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>{children}</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// HOOK: formulario genérico
// ─────────────────────────────────────────────────────────────────────────────

function useForm(inicial) {
  const [form, setForm] = useState(inicial);
  const handleChange = e => setForm(p=>({...p,[e.target.name]:e.target.value}));
  const reset = () => setForm(inicial);
  return [form, setForm, handleChange, reset];
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTA: DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

function Dashboard({clientes,mascotas,citas,productos,onNavigate}) {
  const stats = [
    {label:"Total Clientes",     valor:clientes.length,                                    icono:"👥",nav:"clientes", alerta:false},
    {label:"Total Mascotas",     valor:mascotas.length,                                    icono:"🐾",nav:"mascotas", alerta:false},
    {label:"Total Citas",        valor:citas.length,                                       icono:"📅",nav:"citas",    alerta:false},
    {label:"Productos en Alerta",valor:productos.filter(p=>p.estado!=="Normal").length,    icono:"⚠️",nav:"productos",alerta:true },
  ];
  return (
    <div>
      <p style={{fontSize:13,color:C.textoSec,marginBottom:14}}>
        Bienvenido(a) de vuelta, <strong style={{color:C.verde}}>Admin</strong> 🐾
      </p>
      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
        {stats.map(s=>(
          <div key={s.label} style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,
            padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,borderRadius:10,flexShrink:0,
              background:s.alerta?C.rojoClaro:C.verdeClaro,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
              {s.icono}
            </div>
            <div>
              <div style={{fontSize:12,color:C.textoSec,marginBottom:2}}>{s.label}</div>
              <div style={{fontSize:24,fontWeight:600,color:s.alerta?C.rojo:"inherit"}}>{s.valor}</div>
              <div onClick={()=>onNavigate(s.nav)} style={{fontSize:11,color:C.verdeLink,cursor:"pointer"}}>Ver todos →</div>
            </div>
          </div>
        ))}
      </div>
      {/* Mini tablas */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {/* Clientes */}
        <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:"14px 16px"}}>
          <PanelHeader icono="👥" titulo="Clientes Recientes" onVerTodos={()=>onNavigate("clientes")}/>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Nombre","Email","Teléfono"].map(c=><th key={c} style={{textAlign:"left",padding:"4px 6px",color:C.textoSec,fontWeight:400,borderBottom:`0.5px solid ${C.borde}`}}>{c}</th>)}</tr></thead>
            <tbody>{clientes.slice(0,5).map(c=>(
              <tr key={c.id} style={{borderBottom:`0.5px solid ${C.borde}`}}>
                <td style={{padding:"7px 6px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><Avatar iniciales={c.nombre.split(" ").map(w=>w[0]).slice(0,2).join("")} bgColor="#e8f0fb" textColor="#2c5f9e"/>{c.nombre}</div></td>
                <td style={{padding:"7px 6px",color:C.textoSec,fontSize:11}}>{c.email}</td>
                <td style={{padding:"7px 6px"}}>{c.tel}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        {/* Mascotas */}
        <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:"14px 16px"}}>
          <PanelHeader icono="🐾" titulo="Mascotas Recientes" onVerTodos={()=>onNavigate("mascotas")}/>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Nombre","Raza","Especie"].map(c=><th key={c} style={{textAlign:"left",padding:"4px 6px",color:C.textoSec,fontWeight:400,borderBottom:`0.5px solid ${C.borde}`}}>{c}</th>)}</tr></thead>
            <tbody>{mascotas.slice(0,5).map(m=>(
              <tr key={m.id} style={{borderBottom:`0.5px solid ${C.borde}`}}>
                <td style={{padding:"7px 6px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><Avatar emoji={m.emoji}/>{m.nombre}</div></td>
                <td style={{padding:"7px 6px",color:C.textoSec}}>{m.raza}</td>
                <td style={{padding:"7px 6px"}}><Badge texto={m.especie}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        {/* Citas */}
        <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:"14px 16px"}}>
          <PanelHeader icono="📅" titulo="Próximas Citas" onVerTodos={()=>onNavigate("citas")}/>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Fecha","Mascota","Veterinario","Estado"].map(c=><th key={c} style={{textAlign:"left",padding:"4px 6px",color:C.textoSec,fontWeight:400,borderBottom:`0.5px solid ${C.borde}`}}>{c}</th>)}</tr></thead>
            <tbody>{citas.slice(0,5).map(c=>{const m=mascotas.find(x=>x.nombre===c.mascota);return(
              <tr key={c.id} style={{borderBottom:`0.5px solid ${C.borde}`}}>
                <td style={{padding:"7px 6px",color:C.textoSec}}>{c.fecha}</td>
                <td style={{padding:"7px 6px"}}><div style={{display:"flex",alignItems:"center",gap:5}}><Avatar emoji={m?.emoji}/>{c.mascota}</div></td>
                <td style={{padding:"7px 6px",color:C.textoSec,fontSize:11}}>{c.vet}</td>
                <td style={{padding:"7px 6px"}}><Badge texto={c.estado}/></td>
              </tr>
            );})}</tbody>
          </table>
        </div>
        {/* Productos en alerta */}
        <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:"14px 16px"}}>
          <PanelHeader icono="⚠️" titulo="Productos en Alerta" onVerTodos={()=>onNavigate("productos")}/>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Producto","Stock","Mín.","Estado"].map(c=><th key={c} style={{textAlign:"left",padding:"4px 6px",color:C.textoSec,fontWeight:400,borderBottom:`0.5px solid ${C.borde}`}}>{c}</th>)}</tr></thead>
            <tbody>{productos.map(p=>(
              <tr key={p.id} style={{borderBottom:`0.5px solid ${C.borde}`}}>
                <td style={{padding:"7px 6px"}}>{p.nombre}</td>
                <td style={{padding:"7px 6px"}}>{p.actual}</td>
                <td style={{padding:"7px 6px",color:C.textoSec}}>{p.minimo}</td>
                <td style={{padding:"7px 6px"}}><Badge texto={p.estado}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTA: CLIENTES
// ─────────────────────────────────────────────────────────────────────────────

const CLI_VACIO = {nombre:"",email:"",tel:"",direccion:""};

function ClientesView({clientes,setClientes}) {
  const [busqueda,setBusqueda] = useState("");
  const [modal,setModal]       = useState(null); // null | "nuevo" | objeto
  const [form,setForm,handleChange,reset] = useForm(CLI_VACIO);

  const filtrados = clientes.filter(c=>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())||
    c.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  function abrirNuevo(){ reset(); setModal("nuevo"); }
  function abrirEditar(c){ setForm(c); setModal(c); }

  function guardar(e){
    e.preventDefault();
    if(modal==="nuevo"){
      setClientes(p=>[...p,{...form,id:Date.now()}]);
    } else {
      setClientes(p=>p.map(c=>c.id===modal.id?{...form,id:c.id}:c));
    }
    setModal(null);
  }

  function eliminar(id){
    if(window.confirm("¿Eliminar este cliente?"))
      setClientes(p=>p.filter(c=>c.id!==id));
  }

  return (
    <div>
      <div style={{display:"flex",gap:10,marginBottom:14,alignItems:"center"}}>
        <div style={{position:"relative",flex:1}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textoSec}}>🔍</span>
          <input value={busqueda} onChange={e=>setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o email..."
            style={{width:"100%",padding:"8px 12px 8px 34px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,boxSizing:"border-box"}}/>
        </div>
        <Btn onClick={abrirNuevo}>+ Nuevo Cliente</Btn>
      </div>

      <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <TablaCabecera cols={["#","Nombre","Email","Teléfono","Dirección","Acciones"]}/>
          <tbody>
            {filtrados.length===0
              ? <FilaVacia cols={6}/>
              : filtrados.map((c,i)=>(
                <tr key={c.id} style={{borderBottom:`0.5px solid ${C.borde}`,background:i%2===0?C.blanco:"#fafafa"}}>
                  <td style={{padding:"9px 10px",color:C.textoSec}}>{i+1}</td>
                  <td style={{padding:"9px 10px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <Avatar iniciales={c.nombre.split(" ").map(w=>w[0]).slice(0,2).join("")} bgColor="#e8f0fb" textColor="#2c5f9e"/>
                      {c.nombre}
                    </div>
                  </td>
                  <td style={{padding:"9px 10px",color:C.textoSec}}>{c.email}</td>
                  <td style={{padding:"9px 10px"}}>{c.tel}</td>
                  <td style={{padding:"9px 10px",color:C.textoSec}}>{c.direccion}</td>
                  <td style={{padding:"9px 10px"}}>
                    <BtnIcono onClick={()=>abrirEditar(c)} title="Editar" bgColor="#e8f0fb" color="#2c5f9e">✏️</BtnIcono>
                    <BtnIcono onClick={()=>eliminar(c.id)} title="Eliminar">🗑</BtnIcono>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Paginacion actual={filtrados.length} total={clientes.length}/>
      </div>

      {modal!==null&&(
        <Modal titulo={modal==="nuevo"?"➕ Nuevo Cliente":"✏️ Editar Cliente"} onCerrar={()=>setModal(null)}>
          <form onSubmit={guardar}>
            <Input label="Nombre completo" name="nombre" value={form.nombre} onChange={handleChange} required/>
            <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" required/>
            <Input label="Teléfono" name="tel" value={form.tel} onChange={handleChange} required/>
            <Input label="Dirección" name="direccion" value={form.direccion} onChange={handleChange}/>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
              <Btn outline onClick={()=>setModal(null)}>Cancelar</Btn>
              <Btn type="submit">✅ Guardar</Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTA: MASCOTAS
// ─────────────────────────────────────────────────────────────────────────────

const MSC_VACIO = {nombre:"",especie:"",raza:"",sexo:"",fecha_nacimiento:"",peso:"",cliente:"",alergias:"",enfermedades:""};
const EMOJI_ESPECIE = {Perro:"🐶",Gato:"🐱"};

// Calcula edad a partir de fecha de nacimiento
function calcularEdad(fecha) {
  if (!fecha) return "—";
  const hoy = new Date();
  const nac = new Date(fecha);
  const años = hoy.getFullYear() - nac.getFullYear();
  const meses = hoy.getMonth() - nac.getMonth();
  if (años === 0) return `${meses < 0 ? 0 : meses} mes${meses !== 1 ? "es" : ""}`;
  return `${años} año${años !== 1 ? "s" : ""}`;
}

function MascotasView({mascotas,setMascotas,clientes,historiales,citas}) {
  const [busqueda,setBusqueda]   = useState("");
  const [filtroEsp,setFiltroEsp] = useState("Todos");
  const [modal,setModal]         = useState(null); // null | "nuevo" | objeto(editar) | objeto(ficha)
  const [vistaFicha,setVistaFicha] = useState(null); // mascota seleccionada para ver ficha
  const [form,setForm,handleChange,reset] = useForm(MSC_VACIO);

  const filtradas = mascotas.filter(m=>
    (filtroEsp==="Todos"||m.especie===filtroEsp)&&(
      m.nombre.toLowerCase().includes(busqueda.toLowerCase())||
      m.raza.toLowerCase().includes(busqueda.toLowerCase())||
      m.cliente.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  function abrirNuevo(){ reset(); setModal("nuevo"); }
  function abrirEditar(m){ setForm({...m}); setModal(m); }
  function abrirFicha(m){ setVistaFicha(m); }

  function guardar(e){
    e.preventDefault();
    if(modal==="nuevo"){
      const nuevo={...form,id:String(mascotas.length+1).padStart(3,"0"),
        peso:Number(form.peso),emoji:EMOJI_ESPECIE[form.especie]||"🐾"};
      setMascotas(p=>[...p,nuevo]);
    } else {
      setMascotas(p=>p.map(m=>m.id===modal.id
        ?{...form,id:m.id,peso:Number(form.peso),emoji:EMOJI_ESPECIE[form.especie]||m.emoji}:m));
      // Si la ficha está abierta para esta mascota, actualizarla también
      if(vistaFicha&&vistaFicha.id===modal.id) setVistaFicha({...form,id:modal.id,peso:Number(form.peso),emoji:EMOJI_ESPECIE[form.especie]||modal.emoji});
    }
    setModal(null);
  }

  function eliminar(id){
    if(window.confirm("¿Eliminar esta mascota?")) {
      setMascotas(p=>p.filter(m=>m.id!==id));
      if(vistaFicha&&vistaFicha.id===id) setVistaFicha(null);
    }
  }

  // ── FICHA COMPLETA ──
  if(vistaFicha){
    const m = mascotas.find(x=>x.id===vistaFicha.id)||vistaFicha;
    return (
      <div>
        {/* Botón volver */}
        <button onClick={()=>setVistaFicha(null)} style={{display:"flex",alignItems:"center",gap:6,
          background:"none",border:"none",color:C.verdeLink,fontSize:13,cursor:"pointer",marginBottom:16,padding:0}}>
          ← Volver a mascotas
        </button>

        {/* Encabezado de la ficha */}
        <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,
          padding:20,marginBottom:14,display:"flex",alignItems:"center",gap:20}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:C.verdeClaro,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,flexShrink:0}}>
            {m.emoji}
          </div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
              <h2 style={{fontSize:22,fontWeight:700,margin:0}}>{m.nombre}</h2>
              <Badge texto={m.especie}/>
              <span style={{fontSize:12,color:C.textoSec,background:"#f3f4f6",padding:"2px 8px",borderRadius:10}}>
                {m.sexo||"—"}
              </span>
            </div>
            <div style={{fontSize:13,color:C.textoSec}}>
              {m.raza} · {calcularEdad(m.fecha_nacimiento)} · {m.peso} kg
            </div>
            <div style={{fontSize:13,marginTop:4}}>
              👤 <strong>{m.cliente}</strong>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn outline onClick={()=>abrirEditar(m)}>✏️ Editar</Btn>
            <Btn bg={C.rojo} color={C.rojo} outline onClick={()=>{eliminar(m.id);}}>🗑 Eliminar</Btn>
          </div>
        </div>

        {/* Grid de info clínica */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>

          {/* Datos generales */}
          <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16}}>
            <div style={{fontSize:13,fontWeight:600,color:C.verde,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
              📋 Datos Generales
            </div>
            {[
              ["Nombre",        m.nombre],
              ["Especie",       m.especie],
              ["Raza",          m.raza],
              ["Sexo",          m.sexo||"—"],
              ["Fecha de nac.", m.fecha_nacimiento||"—"],
              ["Edad",          calcularEdad(m.fecha_nacimiento)],
              ["Peso actual",   m.peso ? `${m.peso} kg` : "—"],
            ].map(([label,val])=>(
              <div key={label} style={{display:"flex",justifyContent:"space-between",
                padding:"7px 0",borderBottom:`0.5px solid ${C.borde}`,fontSize:13}}>
                <span style={{color:C.textoSec}}>{label}</span>
                <span style={{fontWeight:500}}>{val}</span>
              </div>
            ))}
          </div>

          {/* Info del dueño */}
          <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16}}>
            <div style={{fontSize:13,fontWeight:600,color:C.verde,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
              👤 Información del Dueño
            </div>
            {(()=>{
              const cli = clientes.find(c=>c.nombre===m.cliente);
              return cli ? [
                ["Nombre",    cli.nombre],
                ["Email",     cli.email],
                ["Teléfono",  cli.tel],
                ["Dirección", cli.direccion||"—"],
              ].map(([label,val])=>(
                <div key={label} style={{display:"flex",justifyContent:"space-between",
                  padding:"7px 0",borderBottom:`0.5px solid ${C.borde}`,fontSize:13}}>
                  <span style={{color:C.textoSec}}>{label}</span>
                  <span style={{fontWeight:500}}>{val}</span>
                </div>
              )) : <p style={{color:C.textoSec,fontSize:13}}>No se encontró el cliente.</p>;
            })()}
          </div>

          {/* Alertas clínicas */}
          <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16}}>
            <div style={{fontSize:13,fontWeight:600,color:"#b7860b",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
              ⚠️ Alergias Conocidas
            </div>
            <p style={{fontSize:13,color: m.alergias&&m.alergias!=="Ninguna"?C.rojo:C.textoSec,
              background: m.alergias&&m.alergias!=="Ninguna"?C.rojoClaro:C.fondo,
              padding:12,borderRadius:8,margin:0}}>
              {m.alergias||"No registradas"}
            </p>
          </div>

          {/* Enfermedades crónicas */}
          <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16}}>
            <div style={{fontSize:13,fontWeight:600,color:C.verde,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
              🩺 Enfermedades Crónicas
            </div>
            <p style={{fontSize:13,color:C.textoSec,background:C.fondo,padding:12,borderRadius:8,margin:0}}>
              {m.enfermedades||"No registradas"}
            </p>
          </div>
        </div>

        {/* ── Historial Clínico de la mascota ── */}
        {(()=>{
          const hists = (historiales||[]).filter(h=>h.mascota===m.nombre);
          return (
            <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16,marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,color:C.verde,marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>🗂 Historial Clínico ({hists.length} registro{hists.length!==1?"s":""})</span>
              </div>
              {hists.length===0
                ? <p style={{color:C.textoSec,fontSize:13,textAlign:"center",padding:16}}>Sin registros clínicos. Ve a <strong>Historial Clínico</strong> para agregar uno.</p>
                : hists.map(h=>(
                  <div key={h.id} style={{border:`0.5px solid ${C.borde}`,borderRadius:8,padding:14,marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontWeight:600,fontSize:13}}>📅 {h.fecha}</span>
                      <span style={{fontSize:12,color:C.textoSec}}>🩺 {h.vet}</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,fontSize:12,marginBottom:8}}>
                      {[["Diagnóstico",h.diagnostico],["Tratamiento",h.tratamiento],
                        ["Temperatura",`${h.temperatura}°C`],["Peso registrado",`${h.peso_registrado} kg`]
                      ].map(([l,v])=>(
                        <div key={l} style={{background:C.fondo,padding:"6px 10px",borderRadius:6}}>
                          <span style={{color:C.textoSec}}>{l}: </span>
                          <span style={{fontWeight:500}}>{v}</span>
                        </div>
                      ))}
                    </div>
                    {h.receta&&<div style={{fontSize:12,background:"#e8f0fb",padding:"6px 10px",borderRadius:6,marginBottom:6}}>💊 <strong>Receta:</strong> {h.receta}</div>}
                    {h.observaciones&&<div style={{fontSize:12,background:"#fef8e7",padding:"6px 10px",borderRadius:6,color:"#92630a"}}>📝 {h.observaciones}</div>}
                  </div>
                ))
              }
            </div>
          );
        })()}

        {/* ── Citas de la mascota ── */}
        {(()=>{
          const citasMascota = (citas||[]).filter(c=>c.mascota===m.nombre);
          return (
            <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16,marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,color:C.verde,marginBottom:12}}>📅 Citas ({citasMascota.length})</div>
              {citasMascota.length===0
                ? <p style={{color:C.textoSec,fontSize:13,textAlign:"center",padding:16}}>Sin citas registradas.</p>
                : <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                    <thead><tr>{["Fecha","Hora","Veterinario","Motivo","Estado"].map(c=>(
                      <th key={c} style={{textAlign:"left",padding:"5px 8px",color:C.textoSec,fontWeight:400,borderBottom:`0.5px solid ${C.borde}`}}>{c}</th>
                    ))}</tr></thead>
                    <tbody>{citasMascota.map(c=>(
                      <tr key={c.id} style={{borderBottom:`0.5px solid ${C.borde}`}}>
                        <td style={{padding:"7px 8px"}}>{c.fecha}</td>
                        <td style={{padding:"7px 8px"}}>{c.hora}</td>
                        <td style={{padding:"7px 8px",color:C.textoSec}}>{c.vet}</td>
                        <td style={{padding:"7px 8px",color:C.textoSec}}>{c.motivo}</td>
                        <td style={{padding:"7px 8px"}}><Badge texto={c.estado}/></td>
                      </tr>
                    ))}</tbody>
                  </table>
              }
            </div>
          );
        })()}

        {/* Modal edición dentro de la ficha */}
        {modal!==null&&(
          <Modal titulo="✏️ Editar Ficha de Mascota" onCerrar={()=>setModal(null)} ancho={560}>
            <form onSubmit={guardar}>
              <div style={{fontSize:12,fontWeight:600,color:C.verde,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Datos básicos</div>
              <FormGrid>
                <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required/>
                <Input label="Especie" name="especie" value={form.especie} onChange={handleChange} opciones={["Perro","Gato","Ave","Reptil","Otro"]} required/>
              </FormGrid>
              <FormGrid>
                <Input label="Raza" name="raza" value={form.raza} onChange={handleChange} required/>
                <Input label="Sexo" name="sexo" value={form.sexo} onChange={handleChange} opciones={["Macho","Hembra"]} required/>
              </FormGrid>
              <FormGrid>
                <Input label="Fecha de nacimiento" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} type="date"/>
                <Input label="Peso (kg)" name="peso" value={form.peso} onChange={handleChange} type="number"/>
              </FormGrid>
              <Input label="Cliente (dueño)" name="cliente" value={form.cliente} onChange={handleChange} opciones={clientes.map(c=>c.nombre)} required/>
              <div style={{fontSize:12,fontWeight:600,color:C.verde,margin:"12px 0 8px",textTransform:"uppercase",letterSpacing:1}}>Información clínica</div>
              <div style={{marginBottom:12}}>
                <label style={{fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:3}}>Alergias conocidas</label>
                <textarea name="alergias" value={form.alergias} onChange={handleChange} rows={2}
                  style={{width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,resize:"vertical",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:12}}>
                <label style={{fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:3}}>Enfermedades crónicas</label>
                <textarea name="enfermedades" value={form.enfermedades} onChange={handleChange} rows={2}
                  style={{width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,resize:"vertical",boxSizing:"border-box"}}/>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
                <Btn outline onClick={()=>setModal(null)}>Cancelar</Btn>
                <Btn type="submit">✅ Guardar cambios</Btn>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  }

  // ── LISTA DE MASCOTAS ──
  return (
    <div>
      <div style={{display:"flex",gap:10,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textoSec}}>🔍</span>
          <input value={busqueda} onChange={e=>setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, raza o cliente..."
            style={{width:"100%",padding:"8px 12px 8px 34px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,boxSizing:"border-box"}}/>
        </div>
        <select value={filtroEsp} onChange={e=>setFiltroEsp(e.target.value)}
          style={{padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,background:C.blanco}}>
          <option value="Todos">Todas las especies</option>
          <option>Perro</option><option>Gato</option><option>Ave</option><option>Reptil</option><option>Otro</option>
        </select>
        <Btn onClick={abrirNuevo}>+ Agregar Mascota</Btn>
      </div>

      <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <TablaCabecera cols={["ID","Nombre","Especie","Raza","Edad","Peso","Cliente","Acciones"]}/>
          <tbody>
            {filtradas.length===0
              ? <FilaVacia cols={8}/>
              : filtradas.map((m,i)=>(
                <tr key={m.id} style={{borderBottom:`0.5px solid ${C.borde}`,background:i%2===0?C.blanco:"#fafafa"}}>
                  <td style={{padding:"9px 10px",color:C.textoSec}}>{m.id}</td>
                  <td style={{padding:"9px 10px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <Avatar emoji={m.emoji}/>
                      <span style={{fontWeight:500}}>{m.nombre}</span>
                    </div>
                  </td>
                  <td style={{padding:"9px 10px"}}><Badge texto={m.especie}/></td>
                  <td style={{padding:"9px 10px",color:C.textoSec}}>{m.raza}</td>
                  <td style={{padding:"9px 10px"}}>{calcularEdad(m.fecha_nacimiento)}</td>
                  <td style={{padding:"9px 10px"}}>{m.peso?`${m.peso} kg`:"—"}</td>
                  <td style={{padding:"9px 10px"}}>{m.cliente}</td>
                  <td style={{padding:"9px 10px",whiteSpace:"nowrap"}}>
                    <BtnIcono onClick={()=>abrirFicha(m)} title="Ver ficha" bgColor={C.verdeClaro} color={C.verde}>👁</BtnIcono>
                    <BtnIcono onClick={()=>abrirEditar(m)} title="Editar" bgColor="#e8f0fb" color="#2c5f9e">✏️</BtnIcono>
                    <BtnIcono onClick={()=>eliminar(m.id)} title="Eliminar">🗑</BtnIcono>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Paginacion actual={filtradas.length} total={mascotas.length}/>
      </div>

      {/* Modal agregar/editar desde la lista */}
      {modal!==null&&(
        <Modal titulo={modal==="nuevo"?"➕ Agregar Mascota":"✏️ Editar Mascota"} onCerrar={()=>setModal(null)} ancho={560}>
          <form onSubmit={guardar}>
            <div style={{fontSize:12,fontWeight:600,color:C.verde,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Datos básicos</div>
            <FormGrid>
              <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required/>
              <Input label="Especie" name="especie" value={form.especie} onChange={handleChange} opciones={["Perro","Gato","Ave","Reptil","Otro"]} required/>
            </FormGrid>
            <FormGrid>
              <Input label="Raza" name="raza" value={form.raza} onChange={handleChange} required/>
              <Input label="Sexo" name="sexo" value={form.sexo} onChange={handleChange} opciones={["Macho","Hembra"]}/>
            </FormGrid>
            <FormGrid>
              <Input label="Fecha de nacimiento" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} type="date"/>
              <Input label="Peso (kg)" name="peso" value={form.peso} onChange={handleChange} type="number"/>
            </FormGrid>
            <Input label="Cliente (dueño)" name="cliente" value={form.cliente} onChange={handleChange} opciones={clientes.map(c=>c.nombre)} required/>
            <div style={{fontSize:12,fontWeight:600,color:C.verde,margin:"12px 0 8px",textTransform:"uppercase",letterSpacing:1}}>Información clínica</div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:3}}>Alergias conocidas</label>
              <textarea name="alergias" value={form.alergias} onChange={handleChange} rows={2}
                style={{width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,resize:"vertical",boxSizing:"border-box"}}
                placeholder="Ej: Polen, AINES, ciertos alimentos..."/>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:3}}>Enfermedades crónicas</label>
              <textarea name="enfermedades" value={form.enfermedades} onChange={handleChange} rows={2}
                style={{width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,resize:"vertical",boxSizing:"border-box"}}
                placeholder="Ej: Diabetes, displasia, hipertiroidismo..."/>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
              <Btn outline onClick={()=>setModal(null)}>Cancelar</Btn>
              <Btn type="submit">✅ Guardar</Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTA: CITAS
// ─────────────────────────────────────────────────────────────────────────────

const CIT_VACIO = {fecha:"",hora:"",mascota:"",cliente:"",vet:"",estado:"Programada",motivo:""};

function CitasView({citas,setCitas,mascotas,veterinarios}) {
  const [filtroVet,setFiltroVet] = useState("Todos");
  const [filtroEst,setFiltroEst] = useState("Todos");
  const [modal,setModal]         = useState(null);
  const [form,setForm,handleChange,reset] = useForm(CIT_VACIO);

  const filtradas = citas.filter(c=>
    (filtroVet==="Todos"||c.vet===filtroVet)&&
    (filtroEst==="Todos"||c.estado===filtroEst)
  );

  function abrirNuevo(){ reset(); setModal("nuevo"); }
  function abrirEditar(c){ setForm(c); setModal(c); }

  const [errorConflicto, setErrorConflicto] = useState(null);

  function guardar(e){
    e.preventDefault();
    setErrorConflicto(null);

    // ── Validación: ¿ya hay una cita Programada con este veterinario en esa fecha y hora? ──
    const conflicto = citas.find(c => {
      const mismoVet   = c.vet    === form.vet;
      const mismaFecha = c.fecha  === form.fecha;
      const mismaHora  = c.hora   === form.hora;
      const activa     = c.estado !== "Cancelada";            // ignorar citas canceladas
      const esOtra     = modal === "nuevo" || c.id !== modal.id; // al editar, ignorar la propia cita
      return mismoVet && mismaFecha && mismaHora && activa && esOtra;
    });

    if (conflicto) {
      setErrorConflicto(
        `⚠️ ${form.vet} ya tiene una cita "${conflicto.estado}" el ${form.fecha} a las ${form.hora} con la mascota ${conflicto.mascota}. Por favor elige otra hora.`
      );
      return; // bloquea el guardado
    }

    if(modal==="nuevo"){
      setCitas(p=>[...p,{...form,id:Date.now()}]);
    } else {
      setCitas(p=>p.map(c=>c.id===modal.id?{...form,id:c.id}:c));
    }
    setModal(null);
  }

  function eliminar(id){
    if(window.confirm("¿Eliminar esta cita?"))
      setCitas(p=>p.filter(c=>c.id!==id));
  }

  // Cambio rápido de estado directamente desde la tabla
  function cambiarEstado(id,nuevoEstado){
    setCitas(p=>p.map(c=>c.id===id?{...c,estado:nuevoEstado}:c));
  }

  const selStyle = {padding:"4px 8px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:11,background:C.blanco,cursor:"pointer"};

  return (
    <div>
      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        <select value={filtroVet} onChange={e=>setFiltroVet(e.target.value)}
          style={{padding:"7px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:12,background:C.blanco,minWidth:160}}>
          <option value="Todos">Todos los veterinarios</option>
          {veterinarios.map(v=><option key={v.id} value={v.nombre}>{v.nombre}{!v.disponible?" (no disponible)":""}</option>)}
        </select>
        <select value={filtroEst} onChange={e=>setFiltroEst(e.target.value)}
          style={{padding:"7px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:12,background:C.blanco,minWidth:140}}>
          {["Todos",...ESTADOS_CITA].map(e=><option key={e} value={e}>{e==="Todos"?"Todos los estados":e}</option>)}
        </select>
        <Btn onClick={abrirNuevo}>+ Nueva Cita</Btn>
        <span style={{fontSize:12,color:C.textoSec,marginLeft:"auto"}}>{filtradas.length} resultado{filtradas.length!==1?"s":""}</span>
      </div>

      <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <TablaCabecera cols={["Fecha","Hora","Mascota","Cliente","Veterinario","Estado","Acciones"]}/>
          <tbody>
            {filtradas.length===0
              ? <FilaVacia cols={7}/>
              : filtradas.map((c,i)=>{
                const m=mascotas.find(x=>x.nombre===c.mascota);
                return(
                  <tr key={c.id} style={{borderBottom:`0.5px solid ${C.borde}`,background:i%2===0?C.blanco:"#fafafa"}}>
                    <td style={{padding:"9px 10px"}}>{c.fecha}</td>
                    <td style={{padding:"9px 10px"}}>{c.hora}</td>
                    <td style={{padding:"9px 10px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><Avatar emoji={m?.emoji||"🐾"}/>{c.mascota}</div></td>
                    <td style={{padding:"9px 10px",color:C.textoSec}}>{c.cliente}</td>
                    <td style={{padding:"9px 10px",color:C.textoSec,fontSize:12}}>{c.vet}</td>
                    <td style={{padding:"9px 10px"}}>
                      {/* Selector de estado directo en la tabla */}
                      <select value={c.estado} onChange={e=>cambiarEstado(c.id,e.target.value)} style={selStyle}>
                        {ESTADOS_CITA.map(est=><option key={est}>{est}</option>)}
                      </select>
                    </td>
                    <td style={{padding:"9px 10px"}}>
                      <BtnIcono onClick={()=>abrirEditar(c)} title="Editar" bgColor="#e8f0fb" color="#2c5f9e">✏️</BtnIcono>
                      <BtnIcono onClick={()=>eliminar(c.id)} title="Eliminar">🗑</BtnIcono>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <Paginacion actual={filtradas.length} total={citas.length}/>
      </div>

      {modal!==null&&(
        <Modal titulo={modal==="nuevo"?"📅 Nueva Cita":"✏️ Editar Cita"} onCerrar={()=>{setModal(null);setErrorConflicto(null);}}>
          <form onSubmit={guardar}>
            <FormGrid>
              <Input label="Fecha" name="fecha" value={form.fecha} onChange={e=>{handleChange(e);setErrorConflicto(null);}} type="date" required/>
              <Input label="Hora" name="hora" value={form.hora} onChange={e=>{handleChange(e);setErrorConflicto(null);}} type="time" required/>
            </FormGrid>
            <Input label="Mascota" name="mascota" value={form.mascota} onChange={handleChange} opciones={mascotas.map(m=>m.nombre)} required/>
            <Input label="Cliente" name="cliente" value={form.cliente} onChange={handleChange} required/>
            <Input label="Veterinario (solo disponibles)" name="vet" value={form.vet} onChange={e=>{handleChange(e);setErrorConflicto(null);}} opciones={veterinarios.filter(v=>v.disponible).map(v=>v.nombre)} required/>
            {veterinarios.filter(v=>v.disponible).length===0&&(
              <p style={{fontSize:12,color:C.rojo,marginTop:-8,marginBottom:12}}>
                ⚠️ No hay veterinarios disponibles. Ve a la sección Veterinarios para cambiar la disponibilidad.
              </p>
            )}
            <Input label="Motivo" name="motivo" value={form.motivo} onChange={handleChange} required/>
            <Input label="Estado" name="estado" value={form.estado} onChange={handleChange} opciones={ESTADOS_CITA} required/>

            {/* Alerta de conflicto de horario */}
            {errorConflicto && (
              <div style={{background:"#fce8e8",border:`1px solid ${C.rojo}`,borderRadius:8,
                padding:"10px 14px",marginBottom:12,fontSize:12,color:C.rojo,lineHeight:1.5}}>
                {errorConflicto}
              </div>
            )}

            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
              <Btn outline onClick={()=>{setModal(null);setErrorConflicto(null);}}>Cancelar</Btn>
              <Btn type="submit">✅ Guardar</Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTA: PRODUCTOS
// ─────────────────────────────────────────────────────────────────────────────

const PRD_VACIO = {nombre:"",categoria:"",actual:"",minimo:"",precio:"",estado:"Normal"};

function ProductosView({productos,setProductos}) {
  const [busqueda,setBusqueda] = useState("");
  const [modal,setModal]       = useState(null);
  const [form,setForm,handleChange,reset] = useForm(PRD_VACIO);

  const filtrados = productos.filter(p=>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  function calcularEstado(actual,minimo){
    const a=Number(actual),m=Number(minimo);
    if(a<=m*0.5) return "Crítico";
    if(a<m)      return "Bajo";
    return "Normal";
  }

  function abrirNuevo(){ reset(); setModal("nuevo"); }
  function abrirEditar(p){ setForm(p); setModal(p); }

  function guardar(e){
    e.preventDefault();
    const estado=calcularEstado(form.actual,form.minimo);
    if(modal==="nuevo"){
      setProductos(p=>[...p,{...form,id:Date.now(),actual:Number(form.actual),minimo:Number(form.minimo),precio:Number(form.precio),estado}]);
    } else {
      setProductos(p=>p.map(x=>x.id===modal.id?{...form,id:x.id,actual:Number(form.actual),minimo:Number(form.minimo),precio:Number(form.precio),estado}:x));
    }
    setModal(null);
  }

  function eliminar(id){
    if(window.confirm("¿Eliminar este producto?"))
      setProductos(p=>p.filter(x=>x.id!==id));
  }

  return (
    <div>
      <div style={{display:"flex",gap:10,marginBottom:14,alignItems:"center"}}>
        <div style={{position:"relative",flex:1}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textoSec}}>🔍</span>
          <input value={busqueda} onChange={e=>setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o categoría..."
            style={{width:"100%",padding:"8px 12px 8px 34px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,boxSizing:"border-box"}}/>
        </div>
        <Btn onClick={abrirNuevo}>+ Nuevo Producto</Btn>
      </div>

      <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <TablaCabecera cols={["Nombre","Categoría","Stock Actual","Stock Mínimo","Precio","Estado","Acciones"]}/>
          <tbody>
            {filtrados.length===0
              ? <FilaVacia cols={7}/>
              : filtrados.map((p,i)=>(
                <tr key={p.id} style={{borderBottom:`0.5px solid ${C.borde}`,background:i%2===0?C.blanco:"#fafafa"}}>
                  <td style={{padding:"9px 10px",fontWeight:500}}>{p.nombre}</td>
                  <td style={{padding:"9px 10px",color:C.textoSec}}>{p.categoria}</td>
                  <td style={{padding:"9px 10px"}}>{p.actual}</td>
                  <td style={{padding:"9px 10px",color:C.textoSec}}>{p.minimo}</td>
                  <td style={{padding:"9px 10px"}}>${p.precio?.toLocaleString()}</td>
                  <td style={{padding:"9px 10px"}}><Badge texto={p.estado}/></td>
                  <td style={{padding:"9px 10px"}}>
                    <BtnIcono onClick={()=>abrirEditar(p)} title="Editar" bgColor="#e8f0fb" color="#2c5f9e">✏️</BtnIcono>
                    <BtnIcono onClick={()=>eliminar(p.id)} title="Eliminar">🗑</BtnIcono>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Paginacion actual={filtrados.length} total={productos.length}/>
      </div>

      {modal!==null&&(
        <Modal titulo={modal==="nuevo"?"➕ Nuevo Producto":"✏️ Editar Producto"} onCerrar={()=>setModal(null)}>
          <form onSubmit={guardar}>
            <Input label="Nombre del producto" name="nombre" value={form.nombre} onChange={handleChange} required/>
            <Input label="Categoría" name="categoria" value={form.categoria} onChange={handleChange} opciones={CATEGORIAS} required/>
            <FormGrid>
              <Input label="Stock Actual" name="actual" value={form.actual} onChange={handleChange} type="number" required/>
              <Input label="Stock Mínimo" name="minimo" value={form.minimo} onChange={handleChange} type="number" required/>
            </FormGrid>
            <Input label="Precio" name="precio" value={form.precio} onChange={handleChange} type="number" required/>
            <p style={{fontSize:11,color:C.textoSec,marginTop:-8,marginBottom:12}}>
              💡 El estado se calcula automáticamente según el stock.
            </p>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
              <Btn outline onClick={()=>setModal(null)}>Cancelar</Btn>
              <Btn type="submit">✅ Guardar</Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTAS PLACEHOLDER (módulos en desarrollo)
// ─────────────────────────────────────────────────────────────────────────────

const Proximamente = ({icono,titulo}) => (
  <div style={{textAlign:"center",padding:80,color:C.textoSec}}>
    <div style={{fontSize:56,marginBottom:16}}>{icono}</div>
    <p style={{fontSize:18,fontWeight:500,marginBottom:8}}>{titulo}</p>
    <p style={{fontSize:13}}>Este módulo estará disponible próximamente.</p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// VISTA: VETERINARIOS
// ─────────────────────────────────────────────────────────────────────────────

const VET_VACIO = {nombre:"",especialidad:"",telefono:"",email:"",disponible:true};

function VeterinariosView({veterinarios,setVeterinarios}) {
  const [modal,setModal] = useState(null);
  const [form,setForm,handleChange,reset] = useForm(VET_VACIO);

  function abrirNuevo(){ reset(); setModal("nuevo"); }
  function abrirEditar(v){ setForm({...v,disponible:v.disponible}); setModal(v); }

  function guardar(e){
    e.preventDefault();
    const entrada={...form,disponible:form.disponible==="true"||form.disponible===true};
    if(modal==="nuevo"){
      setVeterinarios(p=>[...p,{...entrada,id:Date.now()}]);
    } else {
      setVeterinarios(p=>p.map(v=>v.id===modal.id?{...entrada,id:v.id}:v));
    }
    setModal(null);
  }

  function eliminar(id){
    if(window.confirm("¿Eliminar este veterinario?"))
      setVeterinarios(p=>p.filter(v=>v.id!==id));
  }

  function toggleDisponible(id){
    setVeterinarios(p=>p.map(v=>v.id===id?{...v,disponible:!v.disponible}:v));
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
        <Btn onClick={abrirNuevo}>+ Nuevo Veterinario</Btn>
      </div>

      {/* Tarjetas */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14,marginBottom:16}}>
        {veterinarios.map(v=>(
          <div key={v.id} style={{background:C.blanco,borderRadius:12,
            border:`2px solid ${v.disponible?"#1a4731":C.borde}`,padding:16}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:46,height:46,borderRadius:"50%",
                  background:v.disponible?C.verdeClaro:C.rojoClaro,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🩺</div>
                <div>
                  <div style={{fontWeight:600,fontSize:14}}>{v.nombre}</div>
                  <div style={{fontSize:12,color:C.textoSec}}>{v.especialidad}</div>
                </div>
              </div>
              <Badge texto={v.disponible?"Disponible":"No disponible"}/>
            </div>
            <div style={{fontSize:12,color:C.textoSec,marginBottom:4}}>📞 {v.telefono}</div>
            <div style={{fontSize:12,color:C.textoSec,marginBottom:14}}>✉️ {v.email}</div>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",borderTop:`0.5px solid ${C.borde}`,paddingTop:12}}>
              <button onClick={()=>toggleDisponible(v.id)} style={{
                padding:"5px 12px",borderRadius:8,fontSize:11,cursor:"pointer",
                background:v.disponible?C.rojoClaro:C.verdeClaro,
                color:v.disponible?C.rojo:C.verde,
                border:`1px solid ${v.disponible?C.rojo:C.verde}`}}>
                {v.disponible?"⛔ No disponible":"✅ Disponible"}
              </button>
              <BtnIcono onClick={()=>abrirEditar(v)} title="Editar" bgColor="#e8f0fb" color="#2c5f9e">✏️</BtnIcono>
              <BtnIcono onClick={()=>eliminar(v.id)} title="Eliminar">🗑</BtnIcono>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla resumen */}
      <div style={{background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <TablaCabecera cols={["Veterinario","Especialidad","Teléfono","Email","Estado","Acciones"]}/>
          <tbody>
            {veterinarios.length===0
              ? <FilaVacia cols={6}/>
              : veterinarios.map((v,i)=>(
                <tr key={v.id} style={{borderBottom:`0.5px solid ${C.borde}`,background:i%2===0?C.blanco:"#fafafa"}}>
                  <td style={{padding:"9px 10px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:30,height:30,borderRadius:"50%",
                        background:v.disponible?C.verdeClaro:C.rojoClaro,
                        display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🩺</div>
                      <span style={{fontWeight:500}}>{v.nombre}</span>
                    </div>
                  </td>
                  <td style={{padding:"9px 10px",color:C.textoSec}}>{v.especialidad}</td>
                  <td style={{padding:"9px 10px"}}>{v.telefono}</td>
                  <td style={{padding:"9px 10px",color:C.textoSec}}>{v.email}</td>
                  <td style={{padding:"9px 10px"}}>
                    <select value={v.disponible?"Disponible":"No disponible"}
                      onChange={()=>toggleDisponible(v.id)}
                      style={{padding:"4px 8px",border:`1px solid ${C.borde}`,borderRadius:8,
                        fontSize:11,background:C.blanco,cursor:"pointer"}}>
                      <option>Disponible</option>
                      <option>No disponible</option>
                    </select>
                  </td>
                  <td style={{padding:"9px 10px"}}>
                    <BtnIcono onClick={()=>abrirEditar(v)} title="Editar" bgColor="#e8f0fb" color="#2c5f9e">✏️</BtnIcono>
                    <BtnIcono onClick={()=>eliminar(v.id)} title="Eliminar">🗑</BtnIcono>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {modal!==null&&(
        <Modal titulo={modal==="nuevo"?"➕ Nuevo Veterinario":"✏️ Editar Veterinario"} onCerrar={()=>setModal(null)}>
          <form onSubmit={guardar}>
            <Input label="Nombre completo" name="nombre" value={form.nombre} onChange={handleChange} required/>
            <Input label="Especialidad" name="especialidad" value={form.especialidad} onChange={handleChange} opciones={ESPECIALIDADES} required/>
            <FormGrid>
              <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} required/>
              <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" required/>
            </FormGrid>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:6}}>Disponibilidad</label>
              <div style={{display:"flex",gap:12}}>
                {[{val:true,label:"✅ Disponible"},{val:false,label:"⛔ No disponible"}].map(op=>(
                  <label key={String(op.val)} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13}}>
                    <input type="radio" name="disponible" value={String(op.val)}
                      checked={String(form.disponible)===String(op.val)}
                      onChange={handleChange}/>
                    {op.label}
                  </label>
                ))}
              </div>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
              <Btn outline onClick={()=>setModal(null)}>Cancelar</Btn>
              <Btn type="submit">✅ Guardar</Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTA: HISTORIAL CLÍNICO
// ─────────────────────────────────────────────────────────────────────────────

const HIS_VACIO = { mascota:"", fecha:"", vet:"", diagnostico:"", tratamiento:"", receta:"", temperatura:"", peso_registrado:"", observaciones:"" };

function HistorialView({ historiales, setHistoriales, mascotas, veterinarios }) {
  const [busqueda, setBusqueda] = useState("");
  const [modal,    setModal]    = useState(null); // null | "nuevo" | objeto
  const [detalle,  setDetalle]  = useState(null);
  const [form, setForm, handleChange, reset] = useForm(HIS_VACIO);

  // Filtrado por nombre de mascota o diagnóstico
  const filtrados = historiales.filter(h =>
    h.mascota.toLowerCase().includes(busqueda.toLowerCase()) ||
    h.diagnostico.toLowerCase().includes(busqueda.toLowerCase())
  );

  function abrirNuevo() { reset(); setModal("nuevo"); }
  function abrirEditar(h) {
    setForm({ ...h, temperatura: String(h.temperatura), peso_registrado: String(h.peso_registrado) });
    setModal(h);
  }

  function guardar(e) {
    e.preventDefault();
    const entry = { ...form, temperatura: Number(form.temperatura), peso_registrado: Number(form.peso_registrado) };
    if (modal === "nuevo") {
      setHistoriales(p => [...p, { ...entry, id: Date.now() }]);
    } else {
      setHistoriales(p => p.map(h => h.id === modal.id ? { ...entry, id: h.id } : h));
    }
    setModal(null);
  }

  function eliminar(id) {
    if (window.confirm("¿Eliminar este registro del historial?"))
      setHistoriales(p => p.filter(h => h.id !== id));
  }

  const infoRow = (label, valor) => (
    <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 0",
      borderBottom:`0.5px solid ${C.borde}`, fontSize:13 }}>
      <span style={{ color:C.textoSec }}>{label}</span>
      <span style={{ fontWeight:500 }}>{valor}</span>
    </div>
  );

  return (
    <div>
      {/* Barra de búsqueda */}
      <div style={{ display:"flex", gap:10, marginBottom:14, alignItems:"center" }}>
        <div style={{ position:"relative", flex:1 }}>
          <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:C.textoSec }}>🔍</span>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por mascota o diagnóstico..."
            style={{ width:"100%", padding:"8px 12px 8px 34px", border:`1px solid ${C.borde}`,
              borderRadius:8, fontSize:13, boxSizing:"border-box" }} />
        </div>
        <Btn onClick={abrirNuevo}>+ Nuevo Registro</Btn>
      </div>

      {/* Tabla de historiales */}
      <div style={{ background:C.blanco, borderRadius:12, border:`0.5px solid ${C.borde}`, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <TablaCabecera cols={["Fecha","Mascota","Veterinario","Diagnóstico","Temp.","Peso reg.","Acciones"]}/>
          <tbody>
            {filtrados.length === 0
              ? <FilaVacia cols={7}/>
              : filtrados.map((h, i) => {
                  const m = mascotas.find(x => x.nombre === h.mascota);
                  return (
                    <tr key={h.id} style={{ borderBottom:`0.5px solid ${C.borde}`, background:i%2===0?C.blanco:"#fafafa" }}>
                      <td style={{ padding:"9px 10px" }}>{h.fecha}</td>
                      <td style={{ padding:"9px 10px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <Avatar emoji={m?.emoji}/>{h.mascota}
                        </div>
                      </td>
                      <td style={{ padding:"9px 10px", color:C.textoSec, fontSize:12 }}>{h.vet}</td>
                      <td style={{ padding:"9px 10px", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {h.diagnostico}
                      </td>
                      <td style={{ padding:"9px 10px" }}>{h.temperatura}°C</td>
                      <td style={{ padding:"9px 10px" }}>{h.peso_registrado} kg</td>
                      <td style={{ padding:"9px 10px" }}>
                        {/* Ver detalle completo */}
                        <BtnIcono onClick={() => setDetalle(h)} title="Ver detalle"
                          bgColor={C.verdeClaro} color={C.verde}>👁</BtnIcono>
                        {/* Editar */}
                        <BtnIcono onClick={() => abrirEditar(h)} title="Editar"
                          bgColor="#e8f0fb" color="#2c5f9e">✏️</BtnIcono>
                        {/* Eliminar */}
                        <BtnIcono onClick={() => eliminar(h.id)} title="Eliminar">🗑</BtnIcono>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
        <div style={{ padding:"10px 14px", borderTop:`0.5px solid ${C.borde}`, fontSize:12, color:C.textoSec }}>
          Mostrando {filtrados.length} de {historiales.length} registros
        </div>
      </div>

      {/* ── Modal: ver detalle completo ── */}
      {detalle && (
        <Modal titulo={`🗂 Historial — ${detalle.mascota}`} onCerrar={() => setDetalle(null)} ancho={520}>
          {infoRow("Fecha",           detalle.fecha)}
          {infoRow("Veterinario",     detalle.vet)}
          {infoRow("Temperatura",     `${detalle.temperatura}°C`)}
          {infoRow("Peso registrado", `${detalle.peso_registrado} kg`)}

          <div style={{ marginTop:14 }}>
            {[
              ["🔬 Diagnóstico",  detalle.diagnostico],
              ["💊 Tratamiento",  detalle.tratamiento],
              ["📋 Receta",       detalle.receta],
            ].map(([label, valor]) => (
              <div key={label} style={{ marginBottom:12 }}>
                <div style={{ fontSize:12, fontWeight:600, color:C.verde, marginBottom:4 }}>{label}</div>
                <div style={{ padding:"10px 12px", background:C.fondo, borderRadius:8, fontSize:13 }}>
                  {valor || "—"}
                </div>
              </div>
            ))}
          </div>

          {detalle.observaciones && (
            <>
              <div style={{ fontSize:12, fontWeight:600, color:"#b7860b", marginBottom:4 }}>📝 Observaciones</div>
              <div style={{ padding:"10px 12px", background:"#fef8e7", borderRadius:8, fontSize:13, color:"#92630a" }}>
                {detalle.observaciones}
              </div>
            </>
          )}
        </Modal>
      )}

      {/* ── Modal: agregar / editar registro ── */}
      {modal !== null && (
        <Modal titulo={modal === "nuevo" ? "➕ Nuevo Registro Clínico" : "✏️ Editar Registro"} onCerrar={() => setModal(null)} ancho={560}>
          <form onSubmit={guardar}>
            {/* Fila 1: mascota + veterinario */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>
                  Mascota <span style={{ color:C.rojo }}>*</span>
                </label>
                <select name="mascota" value={form.mascota} onChange={handleChange} required
                  style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, boxSizing:"border-box" }}>
                  <option value="">Seleccionar...</option>
                  {mascotas.map(m => <option key={m.id}>{m.nombre}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>
                  Veterinario <span style={{ color:C.rojo }}>*</span>
                </label>
                <select name="vet" value={form.vet} onChange={handleChange} required
                  style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, boxSizing:"border-box" }}>
                  <option value="">Seleccionar...</option>
                  {(veterinarios || []).map(v => <option key={v.id}>{v.nombre}</option>)}
                </select>
              </div>
            </div>

            {/* Fila 2: fecha + temperatura + peso */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0 16px" }}>
              {[
                { label:"Fecha",            name:"fecha",            type:"date",   req:true  },
                { label:"Temperatura (°C)", name:"temperatura",      type:"number", req:true  },
                { label:"Peso (kg)",        name:"peso_registrado",  type:"number", req:true  },
              ].map(f => (
                <div key={f.name} style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>
                    {f.label}{f.req && <span style={{ color:C.rojo }}> *</span>}
                  </label>
                  <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required={f.req}
                    style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, boxSizing:"border-box" }} />
                </div>
              ))}
            </div>

            {/* Textareas */}
            {[
              { label:"Diagnóstico",  name:"diagnostico",  placeholder:"Diagnóstico clínico detallado...",  req:true  },
              { label:"Tratamiento",  name:"tratamiento",  placeholder:"Plan de tratamiento indicado...",   req:true  },
              { label:"Receta",       name:"receta",       placeholder:"Medicamentos y dosis...",           req:false },
              { label:"Observaciones",name:"observaciones",placeholder:"Notas adicionales del veterinario...",req:false},
            ].map(f => (
              <div key={f.name} style={{ marginBottom:12 }}>
                <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>
                  {f.label}{f.req && <span style={{ color:C.rojo }}> *</span>}
                </label>
                <textarea name={f.name} value={form[f.name]} onChange={handleChange}
                  required={f.req} placeholder={f.placeholder} rows={2}
                  style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`,
                    borderRadius:8, fontSize:13, resize:"vertical", boxSizing:"border-box" }} />
              </div>
            ))}

            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
              <Btn outline onClick={() => setModal(null)}>Cancelar</Btn>
              <Btn type="submit">✅ Guardar</Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// VISTA: SERVICIOS
// ─────────────────────────────────────────────────────────────────────────────

const SRV_VACIO = { nombre:"", categoria:"", descripcion:"", precio_base:"", duracion:"", activo:true };

function ServiciosView({ servicios, setServicios }) {
  const [busqueda,     setBusqueda]     = useState("");
  const [filtrocat,    setFiltrocat]    = useState("Todos");
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [modal,        setModal]        = useState(null);
  const [form, setForm, handleChange, reset] = useForm(SRV_VACIO);

  const filtrados = servicios.filter(s => {
    const matchBusq = s.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                      s.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchCat  = filtrocat    === "Todos" || s.categoria === filtrocat;
    const matchAct  = filtroActivo === "Todos" ||
                     (filtroActivo === "Activo"   &&  s.activo) ||
                     (filtroActivo === "Inactivo" && !s.activo);
    return matchBusq && matchCat && matchAct;
  });

  function abrirNuevo() { reset(); setModal("nuevo"); }
  function abrirEditar(s) {
    setForm({ ...s, precio_base:String(s.precio_base), duracion:String(s.duracion), activo:s.activo });
    setModal(s);
  }
  function guardar(e) {
    e.preventDefault();
    const entry = { ...form, precio_base:Number(form.precio_base), duracion:Number(form.duracion),
      activo: form.activo === "true" || form.activo === true };
    if (modal === "nuevo") setServicios(p => [...p, { ...entry, id:Date.now() }]);
    else setServicios(p => p.map(s => s.id === modal.id ? { ...entry, id:s.id } : s));
    setModal(null);
  }
  function eliminar(id) {
    if (window.confirm("¿Eliminar este servicio?")) setServicios(p => p.filter(s => s.id !== id));
  }
  function toggleActivo(id) {
    setServicios(p => p.map(s => s.id === id ? { ...s, activo:!s.activo } : s));
  }

  const colorCat = {
    Consulta:    { bg:"#e8f5ee", color:"#1a4731" }, Prevención:  { bg:"#e8f0fb", color:"#2c5f9e" },
    Estética:    { bg:"#fef0fb", color:"#8e44ad" }, Cirugía:     { bg:"#fce8e8", color:"#c0392b" },
    Nutrición:   { bg:"#fef8e7", color:"#b7860b" }, Odontología: { bg:"#e8f5f5", color:"#16a085" },
    Laboratorio: { bg:"#f0f4ff", color:"#2c3e8e" }, Otro:        { bg:"#f3f4f6", color:"#374151" },
  };

  return (
    <div>
      {/* Barra de herramientas */}
      <div style={{ display:"flex", gap:10, marginBottom:14, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:200 }}>
          <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:C.textoSec }}>🔍</span>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o descripción..."
            style={{ width:"100%", padding:"8px 12px 8px 34px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, boxSizing:"border-box" }} />
        </div>
        <select value={filtrocat} onChange={e => setFiltrocat(e.target.value)}
          style={{ padding:"7px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:12, background:C.blanco }}>
          <option value="Todos">Todas las categorías</option>
          {CATEGORIAS_SERVICIO.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filtroActivo} onChange={e => setFiltroActivo(e.target.value)}
          style={{ padding:"7px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:12, background:C.blanco }}>
          <option value="Todos">Todos los estados</option>
          <option value="Activo">Activos</option>
          <option value="Inactivo">Inactivos</option>
        </select>
        <button onClick={abrirNuevo} style={{ padding:"7px 14px", background:C.verde, color:"#fff",
          border:"none", borderRadius:8, fontSize:12, cursor:"pointer" }}>
          + Nuevo Servicio
        </button>
      </div>

      {/* Contadores rápidos */}
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        {[
          { label:"Total",       valor:servicios.length,                      color:C.verde    },
          { label:"Activos",     valor:servicios.filter(s=>s.activo).length,  color:"#1a6b40"  },
          { label:"Inactivos",   valor:servicios.filter(s=>!s.activo).length, color:C.textoSec },
          { label:"Precio prom.",valor:`$${Math.round(servicios.reduce((s,x)=>s+x.precio_base,0)/Math.max(servicios.length,1)).toLocaleString()}`, color:C.verde },
        ].map(st => (
          <div key={st.label} style={{ background:C.blanco, borderRadius:10, border:`0.5px solid ${C.borde}`,
            padding:"10px 16px" }}>
            <div style={{ fontSize:11, color:C.textoSec }}>{st.label}</div>
            <div style={{ fontSize:18, fontWeight:700, color:st.color }}>{st.valor}</div>
          </div>
        ))}
      </div>

      {/* Tarjetas */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px,1fr))", gap:14, marginBottom:16 }}>
        {filtrados.length === 0
          ? <div style={{ gridColumn:"1/-1", textAlign:"center", padding:60, color:C.textoSec }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🛎</div>
              <p>No hay servicios con los filtros aplicados.</p>
            </div>
          : filtrados.map(s => {
              const cc = colorCat[s.categoria] || colorCat.Otro;
              return (
                <div key={s.id} style={{ background:C.blanco, borderRadius:12,
                  border:`1.5px solid ${s.activo ? C.borde : "#f3f4f6"}`,
                  padding:16, opacity:s.activo?1:0.65, display:"flex", flexDirection:"column" }}>
                  {/* Cabecera */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:600, marginBottom:4 }}>{s.nombre}</div>
                      <span style={{ padding:"2px 9px", borderRadius:10, fontSize:11, fontWeight:500,
                        background:cc.bg, color:cc.color }}>
                        {s.categoria}
                      </span>
                    </div>
                    <span style={{ fontSize:11, fontWeight:500, padding:"2px 8px", borderRadius:10,
                      background:s.activo?C.verdeClaro:"#f3f4f6", color:s.activo?C.verde:C.textoSec }}>
                      {s.activo ? "✅ Activo" : "⛔ Inactivo"}
                    </span>
                  </div>
                  {/* Descripción */}
                  <p style={{ fontSize:12, color:C.textoSec, margin:"0 0 12px", lineHeight:1.5 }}>
                    {s.descripcion}
                  </p>
                  {/* Precio y duración */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"10px 0", borderTop:`0.5px solid ${C.borde}`, marginBottom:12 }}>
                    <div>
                      <div style={{ fontSize:11, color:C.textoSec }}>Precio base</div>
                      <div style={{ fontSize:18, fontWeight:700, color:C.verde }}>${s.precio_base.toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:11, color:C.textoSec }}>Duración</div>
                      <div style={{ fontSize:14, fontWeight:600 }}>⏱ {s.duracion} min</div>
                    </div>
                  </div>
                  {/* Acciones */}
                  <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
                    <button onClick={() => toggleActivo(s.id)} style={{ padding:"5px 10px", fontSize:11, cursor:"pointer",
                      background:s.activo?"#fce8e8":C.verdeClaro, color:s.activo?C.rojo:C.verde,
                      border:`1px solid ${s.activo?C.rojo:C.verde}`, borderRadius:7 }}>
                      {s.activo ? "⛔ Desactivar" : "✅ Activar"}
                    </button>
                    <button onClick={() => abrirEditar(s)} style={{ padding:"5px 10px", fontSize:11, cursor:"pointer",
                      background:"#e8f0fb", color:"#2c5f9e", border:"1px solid #2c5f9e", borderRadius:7 }}>✏️ Editar</button>
                    <button onClick={() => eliminar(s.id)} style={{ padding:"5px 10px", fontSize:11, cursor:"pointer",
                      background:"#fce8e8", color:C.rojo, border:`1px solid ${C.rojo}`, borderRadius:7 }}>🗑</button>
                  </div>
                </div>
              );
            })
        }
      </div>

      {/* Modal agregar / editar */}
      {modal !== null && (
        <Modal titulo={modal === "nuevo" ? "🛎 Nuevo Servicio" : "✏️ Editar Servicio"} onCerrar={() => setModal(null)} ancho={500}>
          <form onSubmit={guardar}>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>
                Nombre <span style={{ color:C.rojo }}>*</span>
              </label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required
                style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, boxSizing:"border-box" }} />
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>
                Categoría <span style={{ color:C.rojo }}>*</span>
              </label>
              <select name="categoria" value={form.categoria} onChange={handleChange} required
                style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, boxSizing:"border-box" }}>
                <option value="">Seleccionar...</option>
                {CATEGORIAS_SERVICIO.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>Descripción</label>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={2}
                placeholder="Describe brevemente el servicio..."
                style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, resize:"vertical", boxSizing:"border-box" }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>
                  Precio base ($) <span style={{ color:C.rojo }}>*</span>
                </label>
                <input type="number" name="precio_base" value={form.precio_base} onChange={handleChange} required
                  style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, boxSizing:"border-box" }} />
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>
                  Duración (min) <span style={{ color:C.rojo }}>*</span>
                </label>
                <input type="number" name="duracion" value={form.duracion} onChange={handleChange} required
                  style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, boxSizing:"border-box" }} />
              </div>
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:C.textoSec, fontWeight:500, display:"block", marginBottom:3 }}>Estado</label>
              <select name="activo" value={String(form.activo)} onChange={handleChange}
                style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.borde}`, borderRadius:8, fontSize:13, boxSizing:"border-box" }}>
                <option value="true">✅ Activo</option>
                <option value="false">⛔ Inactivo</option>
              </select>
            </div>
            {/* Preview precio con IVA */}
            {form.precio_base && (
              <div style={{ background:C.verdeClaro, borderRadius:8, padding:"10px 14px", marginBottom:12,
                fontSize:12, display:"flex", justifyContent:"space-between" }}>
                <span style={{ color:C.textoSec }}>Precio con IVA (19%)</span>
                <span style={{ fontWeight:700, color:C.verde }}>${Math.round(Number(form.precio_base)*1.19).toLocaleString()}</span>
              </div>
            )}
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
              <button type="button" onClick={() => setModal(null)}
                style={{ padding:"7px 14px", background:C.blanco, color:C.verde, border:`1px solid ${C.verde}`, borderRadius:8, fontSize:12, cursor:"pointer" }}>
                Cancelar
              </button>
              <button type="submit"
                style={{ padding:"7px 14px", background:C.verde, color:"#fff", border:"none", borderRadius:8, fontSize:12, cursor:"pointer" }}>
                ✅ Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTA FACTURACIÓN — RF-08
// ─────────────────────────────────────────────────────────────────────────────
const BADGE_FACTURA = {
  Pendiente:     { bg: "#fef8e7", color: "#b7860b" },
  Pagada:        { bg: "#e8f5ee", color: "#1a6b40" },
  Anulada:       { bg: "#fce8e8", color: "#c0392b" },
  Efectivo:      { bg: "#e8f5ee", color: "#1a4731" },
  Tarjeta:       { bg: "#e8f0fb", color: "#2c5f9e" },
  Transferencia: { bg: "#f3f0fc", color: "#6b3fa0" },
};

const BadgeFactura = ({ texto }) => {
  const e = BADGE_FACTURA[texto] || { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 12,
      fontSize: 11, fontWeight: 500, background: e.bg, color: e.color,
    }}>{texto}</span>
  );
};

function imprimirFactura(factura) {
  const { subtotal, iva, total } = calcularTotalesFactura(factura.items);
  const html = `<!DOCTYPE html><html lang="es"><head>
    <meta charset="UTF-8"><title>Factura ${factura.id}</title>
    <style>
      body{font-family:system-ui,sans-serif;padding:32px;max-width:620px;margin:auto;color:#1a1a1a;font-size:13px}
      h1{color:#1a4731;font-size:22px;margin:0 0 4px}
      .sub{color:#6b7280;font-size:12px}
      .divider{border-top:1px solid #e5e7eb;margin:16px 0}
      table{width:100%;border-collapse:collapse;margin:12px 0}
      th{text-align:left;font-size:11px;color:#6b7280;padding:6px 8px;border-bottom:1px solid #e5e7eb}
      td{padding:8px;border-bottom:0.5px solid #e5e7eb;font-size:12px}
      .totales{text-align:right;margin-top:12px}
      .totales p{margin:4px 0;font-size:13px}
      .total-final{font-size:18px;font-weight:700;color:#1a4731;margin-top:8px}
      .footer{color:#6b7280;font-size:11px;text-align:center;margin-top:32px}
      @media print{body{padding:16px}}
    </style></head><body>
    <h1>🐾 DermaVet</h1>
    <p class="sub">Salud y bienestar animal — NIT 900.123.456-7</p>
    <div class="divider"></div>
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <p style="font-size:11px;color:#6b7280;margin:0">FACTURA</p>
        <p style="font-size:20px;font-weight:700;color:#1a4731;margin:2px 0">${factura.id}</p>
        <p style="font-size:12px;margin:4px 0;color:#6b7280">Fecha: ${factura.fecha}</p>
      </div>
      <div style="text-align:right">
        <p style="font-size:11px;color:#6b7280;margin:0">CLIENTE</p>
        <p style="font-weight:600;margin:2px 0">${factura.cliente}</p>
        <p style="font-size:12px;color:#6b7280;margin:0">Paciente: ${factura.mascota}</p>
        <p style="font-size:12px;color:#6b7280;margin:4px 0">Método: ${factura.metodo_pago}</p>
      </div>
    </div>
    <div class="divider"></div>
    <table>
      <thead><tr>
        <th>Descripción</th><th>Tipo</th><th>Cant.</th><th>Precio unit.</th><th>Subtotal</th>
      </tr></thead>
      <tbody>
        ${factura.items.map(it => `
          <tr>
            <td style="font-weight:500">${it.nombre}</td>
            <td style="text-transform:capitalize;color:#6b7280">${it.tipo}</td>
            <td>${it.cantidad}</td>
            <td>$${it.precio_unit.toLocaleString()}</td>
            <td style="font-weight:500">$${(it.cantidad * it.precio_unit).toLocaleString()}</td>
          </tr>`).join("")}
      </tbody>
    </table>
    <div class="totales">
      <p>Subtotal: <strong>$${subtotal.toLocaleString()}</strong></p>
      <p>IVA (${IVA_PORCIENTO}%): <strong>$${iva.toLocaleString()}</strong></p>
      <p class="total-final">Total: $${total.toLocaleString()}</p>
    </div>
    ${factura.notas ? `<div style="margin-top:16px;background:#f5f6fa;padding:10px;border-radius:8px;font-size:12px"><strong>Notas:</strong> ${factura.notas}</div>` : ""}
    <p class="footer">Gracias por confiar en DermaVet • ${new Date().toLocaleDateString("es-CO")}</p>
    </body></html>`;
  const w = window.open("", "_blank");
  w.document.write(html);
  w.document.close();
  w.onload = () => w.print();
}

const FACTVACIO = {
  fecha: new Date().toISOString().slice(0, 10),
  cliente: "", mascota: "", metodo_pago: "Efectivo", estado: "Pendiente", notas: "", items: [],
};

function FacturacionView({ facturas, setFacturas, clientes, mascotas, servicios, productos }) {
  const [busqueda,     setBusqueda]     = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [modal,        setModal]        = useState(null);
  const [detalle,      setDetalle]      = useState(null);
  const [form,         setForm]         = useState(FACTVACIO);
  const [itemForm,     setItemForm]     = useState({ tipo: "servicio", nombre: "", cantidad: 1, precio_unit: 0 });

  const filtradas = facturas.filter(f =>
    (filtroEstado === "Todos" || f.estado === filtroEstado) &&
    (f.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
     f.id.toLowerCase().includes(busqueda.toLowerCase()) ||
     f.mascota.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const totalRecaudado = facturas
    .filter(f => f.estado === "Pagada")
    .reduce((acc, f) => acc + calcularTotalesFactura(f.items).total, 0);

  function abrirNuevo() {
    setForm({ ...FACTVACIO, fecha: new Date().toISOString().slice(0, 10), items: [] });
    setItemForm({ tipo: "servicio", nombre: "", cantidad: 1, precio_unit: 0 });
    setModal("nuevo");
  }
  function abrirEditar(f) {
    setForm({ ...f, items: f.items.map(i => ({ ...i })) });
    setItemForm({ tipo: "servicio", nombre: "", cantidad: 1, precio_unit: 0 });
    setModal(f);
  }
  function handleFormChange(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })); }
  function handleItemChange(e) {
    const { name, value } = e.target;
    if (name === "nombre") {
      const match = servicios.find(s => s.nombre === value) || productos.find(p => p.nombre === value);
      setItemForm(p => ({ ...p, nombre: value, precio_unit: match ? (match.precio_base || match.precio || 0) : p.precio_unit }));
    } else {
      setItemForm(p => ({ ...p, [name]: name === "cantidad" || name === "precio_unit" ? Number(value) : value }));
    }
  }
  function agregarItem() {
    if (!itemForm.nombre || itemForm.cantidad < 1) return;
    setForm(p => ({ ...p, items: [...p.items, { ...itemForm }] }));
    setItemForm({ tipo: "servicio", nombre: "", cantidad: 1, precio_unit: 0 });
  }
  function quitarItem(idx) { setForm(p => ({ ...p, items: p.items.filter((_, i) => i !== idx) })); }
  function guardar(e) {
    e.preventDefault();
    if (form.items.length === 0) { alert("Agrega al menos un ítem."); return; }
    const nuevaId = modal === "nuevo" ? "F-" + String(facturas.length + 1).padStart(3, "0") : form.id;
    const entry = { ...form, id: nuevaId };
    if (modal === "nuevo") setFacturas(p => [...p, entry]);
    else setFacturas(p => p.map(f => f.id === modal.id ? entry : f));
    setModal(null);
  }
  function eliminar(id) { if (window.confirm("¿Eliminar esta factura?")) setFacturas(p => p.filter(f => f.id !== id)); }
  function cambiarEstado(id, nuevoEstado) { setFacturas(p => p.map(f => f.id === id ? { ...f, estado: nuevoEstado } : f)); }

  const opcionesItem = itemForm.tipo === "servicio"
    ? servicios.filter(s => s.activo).map(s => s.nombre)
    : productos.map(p => p.nombre);

  // ── VISTA DETALLE ──
  if (detalle) {
    const f = facturas.find(x => x.id === detalle.id) || detalle;
    const { subtotal, iva, total } = calcularTotalesFactura(f.items);
    return (
      <div>
        <button onClick={() => setDetalle(null)} style={{ display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:C.verdeLink,fontSize:13,cursor:"pointer",marginBottom:16,padding:0 }}>
          ← Volver a Facturación
        </button>
        <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:24,marginBottom:14 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,flexWrap:"wrap",gap:12 }}>
            <div>
              <div style={{ fontSize:11,color:C.textoSec,marginBottom:2 }}>FACTURA</div>
              <div style={{ fontSize:24,fontWeight:700,color:C.verde }}>{f.id}</div>
              <div style={{ fontSize:12,color:C.textoSec,marginTop:4 }}>Fecha: {f.fecha}</div>
            </div>
            <div style={{ display:"flex",gap:8,alignItems:"center",flexWrap:"wrap" }}>
              <BadgeFactura texto={f.estado}/>
              <BadgeFactura texto={f.metodo_pago}/>
              <button onClick={() => imprimirFactura(f)} style={{ padding:"6px 14px",background:C.verdeClaro,color:C.verde,border:`1px solid ${C.verde}`,borderRadius:8,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
                🖨️ Exportar / Imprimir
              </button>
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20 }}>
            {[["Cliente",f.cliente],["Paciente / Mascota",f.mascota],["Método de pago",f.metodo_pago],["Estado",f.estado]].map(([lbl,val]) => (
              <div key={lbl} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`0.5px solid ${C.borde}`,fontSize:13 }}>
                <span style={{ color:C.textoSec }}>{lbl}</span><span style={{ fontWeight:500 }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize:12,fontWeight:600,color:C.verde,marginBottom:10,textTransform:"uppercase",letterSpacing:1 }}>Ítems</div>
          <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13,marginBottom:16 }}>
            <thead>
              <tr style={{ background:C.fondo }}>
                {["Descripción","Tipo","Cantidad","Precio unit.","Subtotal"].map(h => (
                  <th key={h} style={{ textAlign:"left",padding:"8px 10px",fontSize:11,color:C.textoSec,fontWeight:500,borderBottom:`0.5px solid ${C.borde}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {f.items.map((it, i) => (
                <tr key={i} style={{ borderBottom:`0.5px solid ${C.borde}` }}>
                  <td style={{ padding:"9px 10px",fontWeight:500 }}>{it.nombre}</td>
                  <td style={{ padding:"9px 10px",textTransform:"capitalize",color:C.textoSec }}>{it.tipo}</td>
                  <td style={{ padding:"9px 10px",color:C.textoSec }}>{it.cantidad}</td>
                  <td style={{ padding:"9px 10px" }}>${it.precio_unit.toLocaleString()}</td>
                  <td style={{ padding:"9px 10px",fontWeight:600 }}>${(it.cantidad * it.precio_unit).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display:"flex",justifyContent:"flex-end" }}>
            <div style={{ minWidth:240 }}>
              {[["Subtotal",`$${subtotal.toLocaleString()}`],[`IVA (${IVA_PORCIENTO}%)`,`$${iva.toLocaleString()}`]].map(([lbl,val]) => (
                <div key={lbl} style={{ display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:13,color:C.textoSec }}>
                  <span>{lbl}</span><span>{val}</span>
                </div>
              ))}
              <div style={{ display:"flex",justifyContent:"space-between",padding:"10px 0 0",borderTop:`1.5px solid ${C.verde}`,fontSize:18,fontWeight:700,color:C.verde,marginTop:6 }}>
                <span>Total</span><span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          {f.notas && <div style={{ background:C.fondo,borderRadius:8,padding:"10px 14px",marginTop:16,fontSize:13 }}><strong>Notas: </strong>{f.notas}</div>}
          <div style={{ display:"flex",gap:8,marginTop:20,borderTop:`0.5px solid ${C.borde}`,paddingTop:16 }}>
            <Btn onClick={() => abrirEditar(f)}>Editar</Btn>
            <Btn bg={C.rojo} color={C.rojo} outline onClick={() => { eliminar(f.id); setDetalle(null); }}>Eliminar</Btn>
            <div style={{ marginLeft:"auto" }}><Btn outline onClick={() => imprimirFactura(f)}>🖨️ Imprimir</Btn></div>
          </div>
        </div>
      </div>
    );
  }

  // ── LISTA ──
  return (
    <div>
      {/* KPIs */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14 }}>
        {[
          { label:"Total Facturas", valor:facturas.length,                                    color:C.verde,   bg:C.verdeClaro, icono:"🧾" },
          { label:"Pendientes",     valor:facturas.filter(f=>f.estado==="Pendiente").length,  color:"#b7860b", bg:"#fef8e7",    icono:"⏳" },
          { label:"Pagadas",        valor:facturas.filter(f=>f.estado==="Pagada").length,     color:"#1a6b40", bg:"#e8f5ee",    icono:"✅" },
          { label:"Recaudado",      valor:`$${totalRecaudado.toLocaleString()}`,               color:C.verde,   bg:C.verdeClaro, icono:"💰" },
        ].map(k => (
          <div key={k.label} style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:40,height:40,borderRadius:10,background:k.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{k.icono}</div>
            <div>
              <div style={{ fontSize:11,color:C.textoSec,marginBottom:2 }}>{k.label}</div>
              <div style={{ fontSize:18,fontWeight:700,color:k.color }}>{k.valor}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{ display:"flex",gap:10,marginBottom:14,alignItems:"center",flexWrap:"wrap" }}>
        <div style={{ position:"relative",flex:1 }}>
          <span style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textoSec }}>🔍</span>
          <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar por ID, cliente o mascota..."
            style={{ width:"100%",padding:"8px 12px 8px 34px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,boxSizing:"border-box" }}/>
        </div>
        <select value={filtroEstado} onChange={e=>setFiltroEstado(e.target.value)}
          style={{ padding:"7px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:12,background:C.blanco }}>
          <option value="Todos">Todos los estados</option>
          {ESTADOS_FACTURA.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        <Btn onClick={abrirNuevo}>+ Nueva Factura</Btn>
      </div>

      {/* Tabla */}
      <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,overflow:"hidden" }}>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
          <TablaCabecera cols={["#","ID","Fecha","Cliente","Mascota","Ítems","Total","Método","Estado","Acciones"]}/>
          <tbody>
            {filtradas.length === 0 ? <FilaVacia cols={10}/> : filtradas.map((f, i) => {
              const { total } = calcularTotalesFactura(f.items);
              return (
                <tr key={f.id} style={{ borderBottom:`0.5px solid ${C.borde}`,background:i%2===0?C.blanco:"#fafafa" }}>
                  <td style={{ padding:"9px 10px",color:C.textoSec }}>{i+1}</td>
                  <td style={{ padding:"9px 10px",fontWeight:600,color:C.verde }}>
                    <span onClick={()=>setDetalle(f)} style={{ cursor:"pointer",textDecoration:"underline" }}>{f.id}</span>
                  </td>
                  <td style={{ padding:"9px 10px",color:C.textoSec }}>{f.fecha}</td>
                  <td style={{ padding:"9px 10px",fontWeight:500 }}>{f.cliente}</td>
                  <td style={{ padding:"9px 10px",color:C.textoSec }}>{f.mascota}</td>
                  <td style={{ padding:"9px 10px",color:C.textoSec }}>{f.items.length} ítem{f.items.length!==1?"s":""}</td>
                  <td style={{ padding:"9px 10px",fontWeight:600,color:C.verde }}>${total.toLocaleString()}</td>
                  <td style={{ padding:"9px 10px" }}><BadgeFactura texto={f.metodo_pago}/></td>
                  <td style={{ padding:"9px 10px" }}>
                    <select value={f.estado} onChange={e=>cambiarEstado(f.id,e.target.value)}
                      style={{ padding:"3px 8px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:11,background:C.blanco,cursor:"pointer" }}>
                      {ESTADOS_FACTURA.map(es=><option key={es} value={es}>{es}</option>)}
                    </select>
                  </td>
                  <td style={{ padding:"9px 10px",whiteSpace:"nowrap" }}>
                    <BtnIcono onClick={()=>setDetalle(f)}   title="Ver detalle"       bgColor={C.verdeClaro} color={C.verde}>👁</BtnIcono>
                    <BtnIcono onClick={()=>abrirEditar(f)}  title="Editar"            bgColor="#e8f0fb"      color="#2c5f9e">✏️</BtnIcono>
                    <BtnIcono onClick={()=>imprimirFactura(f)} title="Imprimir/PDF"   bgColor={C.verdeClaro} color={C.verde}>🖨️</BtnIcono>
                    <BtnIcono onClick={()=>eliminar(f.id)}  title="Eliminar">🗑</BtnIcono>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginacion actual={filtradas.length} total={facturas.length}/>
      </div>

      {/* Modal crear/editar */}
      {modal !== null && (
        <Modal titulo={modal==="nuevo"?"Nueva Factura":`Editar Factura ${form.id}`} onCerrar={()=>setModal(null)} ancho={620}>
          <form onSubmit={guardar}>
            <FormGrid>
              <Input label="Cliente"  name="cliente"  value={form.cliente}  onChange={handleFormChange} opciones={clientes.map(c=>c.nombre)} required/>
              <Input label="Mascota"  name="mascota"  value={form.mascota}  onChange={handleFormChange} opciones={mascotas.map(m=>m.nombre)} required/>
            </FormGrid>
            <FormGrid>
              <Input label="Fecha"          name="fecha"        value={form.fecha}       onChange={handleFormChange} type="date" required/>
              <Input label="Método de pago" name="metodo_pago"  value={form.metodo_pago} onChange={handleFormChange} opciones={METODOS_PAGO} required/>
            </FormGrid>
            <Input label="Estado" name="estado" value={form.estado} onChange={handleFormChange} opciones={ESTADOS_FACTURA} required/>

            <div style={{ fontSize:12,fontWeight:600,color:C.verde,margin:"16px 0 10px",textTransform:"uppercase",letterSpacing:1 }}>Ítems de la factura</div>

            {/* Tabla ítems */}
            {form.items.length > 0 && (
              <div style={{ marginBottom:12,background:C.fondo,borderRadius:8,overflow:"hidden" }}>
                <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12 }}>
                  <thead><tr>
                    {["Nombre","Tipo","Cant.","P. Unit.","Subtotal",""].map(h=>(
                      <th key={h} style={{ textAlign:"left",padding:"6px 8px",color:C.textoSec,fontWeight:500,fontSize:11,borderBottom:`0.5px solid ${C.borde}` }}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {form.items.map((it,idx)=>(
                      <tr key={idx} style={{ borderBottom:`0.5px solid ${C.borde}` }}>
                        <td style={{ padding:"7px 8px",fontWeight:500 }}>{it.nombre}</td>
                        <td style={{ padding:"7px 8px",color:C.textoSec,textTransform:"capitalize" }}>{it.tipo}</td>
                        <td style={{ padding:"7px 8px" }}>{it.cantidad}</td>
                        <td style={{ padding:"7px 8px" }}>${it.precio_unit.toLocaleString()}</td>
                        <td style={{ padding:"7px 8px",fontWeight:600,color:C.verde }}>${(it.cantidad*it.precio_unit).toLocaleString()}</td>
                        <td style={{ padding:"7px 8px" }}>
                          <button type="button" onClick={()=>quitarItem(idx)} style={{ background:C.rojoClaro,color:C.rojo,border:`1px solid ${C.rojo}`,borderRadius:6,fontSize:11,padding:"2px 7px",cursor:"pointer" }}>✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Añadir ítem */}
            <div style={{ background:"#f0f4f2",borderRadius:8,padding:"10px 12px",marginBottom:12 }}>
              <div style={{ fontSize:11,color:C.textoSec,marginBottom:8,fontWeight:600 }}>AÑADIR ÍTEM</div>
              <div style={{ display:"grid",gridTemplateColumns:"100px 1fr 60px 110px 70px",gap:8,alignItems:"flex-end" }}>
                <div>
                  <label style={{ fontSize:11,color:C.textoSec,display:"block",marginBottom:3 }}>Tipo</label>
                  <select name="tipo" value={itemForm.tipo} onChange={handleItemChange}
                    style={{ width:"100%",padding:"6px 8px",border:`1px solid ${C.borde}`,borderRadius:6,fontSize:12 }}>
                    <option value="servicio">Servicio</option>
                    <option value="producto">Producto</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:11,color:C.textoSec,display:"block",marginBottom:3 }}>Nombre</label>
                  <select name="nombre" value={itemForm.nombre} onChange={handleItemChange}
                    style={{ width:"100%",padding:"6px 8px",border:`1px solid ${C.borde}`,borderRadius:6,fontSize:12 }}>
                    <option value="">Seleccionar...</option>
                    {opcionesItem.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:11,color:C.textoSec,display:"block",marginBottom:3 }}>Cant.</label>
                  <input type="number" name="cantidad" value={itemForm.cantidad} onChange={handleItemChange} min={1}
                    style={{ width:"100%",padding:"6px 8px",border:`1px solid ${C.borde}`,borderRadius:6,fontSize:12,boxSizing:"border-box" }}/>
                </div>
                <div>
                  <label style={{ fontSize:11,color:C.textoSec,display:"block",marginBottom:3 }}>P. Unitario</label>
                  <input type="number" name="precio_unit" value={itemForm.precio_unit} onChange={handleItemChange} min={0}
                    style={{ width:"100%",padding:"6px 8px",border:`1px solid ${C.borde}`,borderRadius:6,fontSize:12,boxSizing:"border-box" }}/>
                </div>
                <button type="button" onClick={agregarItem}
                  style={{ padding:"6px 10px",background:C.verde,color:"#fff",border:"none",borderRadius:6,fontSize:12,cursor:"pointer",whiteSpace:"nowrap" }}>
                  + Añadir
                </button>
              </div>
            </div>

            {/* Resumen totales */}
            {form.items.length > 0 && (() => {
              const { subtotal, iva, total } = calcularTotalesFactura(form.items);
              return (
                <div style={{ background:C.verdeClaro,borderRadius:8,padding:"10px 14px",marginBottom:12,fontSize:13 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:3 }}>
                    <span style={{ color:C.textoSec }}>Subtotal</span><span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:3 }}>
                    <span style={{ color:C.textoSec }}>IVA ({IVA_PORCIENTO}%)</span><span>${iva.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:16,color:C.verde,marginTop:6 }}>
                    <span>Total</span><span>${total.toLocaleString()}</span>
                  </div>
                </div>
              );
            })()}

            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:3 }}>Notas</label>
              <textarea name="notas" value={form.notas} onChange={handleFormChange} rows={2}
                placeholder="Observaciones, acuerdos de pago..."
                style={{ width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,resize:"vertical",boxSizing:"border-box" }}/>
            </div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end",marginTop:8 }}>
              <Btn outline onClick={()=>setModal(null)}>Cancelar</Btn>
              <Btn type="submit">Guardar Factura</Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTA REPORTES Y ESTADÍSTICAS — RF-09
// ─────────────────────────────────────────────────────────────────────────────
function ReportesView({ facturas, citas, clientes, mascotas, servicios }) {
  const [periodo, setPeriodo] = useState("mes");
  const hoy = new Date();

  const filtrarPorPeriodo = (arr, campo) => arr.filter(item => {
    if (!item[campo]) return false;
    const d = new Date(item[campo]);
    if (periodo === "semana") { const s = new Date(hoy); s.setDate(hoy.getDate()-7); return d >= s; }
    if (periodo === "mes")   return d.getMonth()===hoy.getMonth() && d.getFullYear()===hoy.getFullYear();
    if (periodo === "año")   return d.getFullYear()===hoy.getFullYear();
    return true;
  });

  const factPeriodo  = filtrarPorPeriodo(facturas, "fecha");
  const citasPeriodo = filtrarPorPeriodo(citas, "fecha");
  const factPagadas  = factPeriodo.filter(f => f.estado === "Pagada");
  const ingresoTotal = factPagadas.reduce((acc, f) => acc + calcularTotalesFactura(f.items).total, 0);
  const ticketPromedio = factPagadas.length > 0 ? Math.round(ingresoTotal / factPagadas.length) : 0;

  // Cliente más frecuente
  const frecClientes = {};
  citasPeriodo.forEach(c => { if(c.cliente) frecClientes[c.cliente] = (frecClientes[c.cliente]||0)+1; });
  const clienteTop = Object.entries(frecClientes).sort((a,b)=>b[1]-a[1]).slice(0,5);

  // Servicios más solicitados
  const frecServicios = {};
  citasPeriodo.forEach(c => { if(c.motivo) frecServicios[c.motivo] = (frecServicios[c.motivo]||0)+1; });
  const serviciosTop = Object.entries(frecServicios).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const maxServ = serviciosTop[0]?.[1] || 1;

  // Gráfico de barras ingresos (últimos 6 meses)
  const meses = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
    const label = d.toLocaleString("es-CO", { month: "short" });
    const ingreso = facturas
      .filter(f => { const fd = new Date(f.fecha); return f.estado==="Pagada" && fd.getMonth()===d.getMonth() && fd.getFullYear()===d.getFullYear(); })
      .reduce((acc,f) => acc + calcularTotalesFactura(f.items).total, 0);
    meses.push({ label, ingreso });
  }
  const maxIngreso = Math.max(...meses.map(m=>m.ingreso), 1);

  // Distribución por especie
  const porEspecie = {};
  mascotas.forEach(m => { porEspecie[m.especie] = (porEspecie[m.especie]||0)+1; });
  const especieEntries = Object.entries(porEspecie);
  const coloresEspecie = ["#1a4731","#2c5f9e","#b7860b","#6b3fa0","#c0392b"];

  // Estado citas
  const citasAsistidas   = citasPeriodo.filter(c=>c.estado==="Asistida").length;
  const citasProgramadas = citasPeriodo.filter(c=>c.estado==="Programada").length;
  const citasCanceladas  = citasPeriodo.filter(c=>c.estado==="Cancelada").length;
  const totalCitasPer    = citasPeriodo.length || 1;

  return (
    <div>
      {/* Selector período */}
      <div style={{ display:"flex",gap:8,marginBottom:16,alignItems:"center" }}>
        <span style={{ fontSize:13,color:C.textoSec,marginRight:4 }}>Período:</span>
        {[["semana","Última semana"],["mes","Este mes"],["año","Este año"],["todo","Todo"]].map(([val,label])=>(
          <button key={val} onClick={()=>setPeriodo(val)} style={{
            padding:"5px 14px",borderRadius:8,fontSize:12,cursor:"pointer",
            background:periodo===val?C.verde:C.blanco,
            color:periodo===val?"#fff":C.textoSec,
            border:`1px solid ${periodo===val?C.verde:C.borde}`,
          }}>{label}</button>
        ))}
      </div>

      {/* KPIs */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16 }}>
        {[
          { label:"Ingresos del período", valor:`$${ingresoTotal.toLocaleString()}`, icono:"💰", color:C.verde,   bg:C.verdeClaro },
          { label:"Facturas emitidas",    valor:factPeriodo.length,                  icono:"🧾", color:"#2c5f9e", bg:"#e8f0fb"   },
          { label:"Ticket promedio",      valor:`$${ticketPromedio.toLocaleString()}`,icono:"📊", color:"#6b3fa0", bg:"#f3f0fc"   },
          { label:"Citas del período",    valor:citasPeriodo.length,                 icono:"📅", color:"#b7860b", bg:"#fef8e7"   },
        ].map(k=>(
          <div key={k.label} style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:44,height:44,borderRadius:10,background:k.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{k.icono}</div>
            <div>
              <div style={{ fontSize:11,color:C.textoSec,marginBottom:2 }}>{k.label}</div>
              <div style={{ fontSize:20,fontWeight:700,color:k.color }}>{k.valor}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Fila 1: Gráfico barras + Distribución especies */}
      <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:12,marginBottom:12 }}>
        <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16 }}>
          <div style={{ fontSize:13,fontWeight:600,color:C.verde,marginBottom:16 }}>📈 Ingresos por mes (últimos 6 meses)</div>
          <div style={{ display:"flex",alignItems:"flex-end",gap:10,height:140 }}>
            {meses.map((m,i)=>(
              <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                <div style={{ fontSize:10,color:C.textoSec,fontWeight:500 }}>{m.ingreso>0?`$${(m.ingreso/1000).toFixed(0)}k`:"—"}</div>
                <div style={{ width:"100%",background:i===5?C.verde:C.verdeClaro,borderRadius:"4px 4px 0 0",height:`${Math.max((m.ingreso/maxIngreso)*100,m.ingreso>0?4:0)}px`,minHeight:m.ingreso>0?4:0 }}/>
                <div style={{ fontSize:11,color:C.textoSec }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16 }}>
          <div style={{ fontSize:13,fontWeight:600,color:C.verde,marginBottom:14 }}>🐾 Mascotas por especie</div>
          {especieEntries.map(([esp,cant],i)=>{
            const pct = Math.round((cant/mascotas.length)*100);
            return (
              <div key={esp} style={{ marginBottom:10 }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4 }}>
                  <span style={{ fontWeight:500 }}>{esp}</span>
                  <span style={{ color:C.textoSec }}>{cant} ({pct}%)</span>
                </div>
                <div style={{ background:C.fondo,borderRadius:6,height:8,overflow:"hidden" }}>
                  <div style={{ width:`${pct}%`,height:"100%",background:coloresEspecie[i%coloresEspecie.length],borderRadius:6 }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fila 2: Clientes frecuentes + Servicios + Estado citas */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12 }}>
        {/* Clientes */}
        <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16 }}>
          <div style={{ fontSize:13,fontWeight:600,color:C.verde,marginBottom:12 }}>👤 Clientes más frecuentes</div>
          {clienteTop.length===0
            ? <p style={{ fontSize:13,color:C.textoSec,textAlign:"center",padding:16 }}>Sin datos en el período</p>
            : clienteTop.map(([nombre,cant],i)=>(
              <div key={nombre} style={{ display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:i<clienteTop.length-1?`0.5px solid ${C.borde}`:"none" }}>
                <div style={{ width:26,height:26,borderRadius:"50%",background:C.verdeClaro,color:C.verde,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0 }}>{i+1}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12,fontWeight:500 }}>{nombre}</div>
                  <div style={{ fontSize:11,color:C.textoSec }}>{cant} cita{cant!==1?"s":""}</div>
                </div>
                {i===0 && <span style={{ fontSize:14 }}>🏆</span>}
              </div>
            ))}
        </div>

        {/* Servicios */}
        <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16 }}>
          <div style={{ fontSize:13,fontWeight:600,color:C.verde,marginBottom:12 }}>🩺 Servicios más solicitados</div>
          {serviciosTop.length===0
            ? <p style={{ fontSize:13,color:C.textoSec,textAlign:"center",padding:16 }}>Sin datos en el período</p>
            : serviciosTop.map(([serv,cant])=>(
              <div key={serv} style={{ marginBottom:10 }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4 }}>
                  <span style={{ fontWeight:500 }}>{serv}</span>
                  <span style={{ color:C.textoSec }}>{cant}x</span>
                </div>
                <div style={{ background:C.fondo,borderRadius:6,height:7,overflow:"hidden" }}>
                  <div style={{ width:`${(cant/maxServ)*100}%`,height:"100%",background:C.verde,borderRadius:6 }}/>
                </div>
              </div>
            ))}
        </div>

        {/* Estado citas */}
        <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:16 }}>
          <div style={{ fontSize:13,fontWeight:600,color:C.verde,marginBottom:12 }}>📋 Estado de citas</div>
          {[
            { label:"Asistidas",   valor:citasAsistidas,   color:"#1a6b40", bg:"#e8f5ee" },
            { label:"Programadas", valor:citasProgramadas, color:"#b7860b", bg:"#fef8e7" },
            { label:"Canceladas",  valor:citasCanceladas,  color:C.rojo,    bg:C.rojoClaro },
          ].map(item=>{
            const pct = Math.round((item.valor/totalCitasPer)*100);
            return (
              <div key={item.label} style={{ marginBottom:12 }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4 }}>
                  <span style={{ fontWeight:500,color:item.color }}>{item.label}</span>
                  <span style={{ color:C.textoSec }}>{item.valor} ({pct}%)</span>
                </div>
                <div style={{ background:C.fondo,borderRadius:6,height:8,overflow:"hidden" }}>
                  <div style={{ width:`${pct}%`,height:"100%",background:item.color,borderRadius:6 }}/>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop:16,borderTop:`0.5px solid ${C.borde}`,paddingTop:12 }}>
            <div style={{ fontSize:11,color:C.textoSec,marginBottom:4 }}>Tasa de asistencia</div>
            <div style={{ fontSize:22,fontWeight:700,color:C.verde }}>{Math.round((citasAsistidas/totalCitasPer)*100)}%</div>
          </div>
        </div>
      </div>

      {/* Tabla facturas recientes */}
      <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,overflow:"hidden" }}>
        <div style={{ padding:"14px 16px",borderBottom:`0.5px solid ${C.borde}`,fontSize:13,fontWeight:600,color:C.verde }}>
          🧾 Facturas recientes del período
        </div>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
          <TablaCabecera cols={["ID","Fecha","Cliente","Mascota","Total c/IVA","Método","Estado"]}/>
          <tbody>
            {factPeriodo.length===0 ? <FilaVacia cols={7} msg="No hay facturas en este período"/> : factPeriodo.slice(0,8).map((f,i)=>{
              const { total } = calcularTotalesFactura(f.items);
              return (
                <tr key={f.id} style={{ borderBottom:`0.5px solid ${C.borde}`,background:i%2===0?C.blanco:"#fafafa" }}>
                  <td style={{ padding:"8px 10px",fontWeight:600,color:C.verde }}>{f.id}</td>
                  <td style={{ padding:"8px 10px",color:C.textoSec }}>{f.fecha}</td>
                  <td style={{ padding:"8px 10px" }}>{f.cliente}</td>
                  <td style={{ padding:"8px 10px",color:C.textoSec }}>{f.mascota}</td>
                  <td style={{ padding:"8px 10px",fontWeight:600 }}>${total.toLocaleString()}</td>
                  <td style={{ padding:"8px 10px" }}><BadgeFactura texto={f.metodo_pago}/></td>
                  <td style={{ padding:"8px 10px" }}><BadgeFactura texto={f.estado}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISTA INVENTARIO — RF-06
// ─────────────────────────────────────────────────────────────────────────────
function calcularEstadoInv(actual, minimo) {
  if (actual === 0)             return "Agotado";
  if (actual <= minimo * 0.5)  return "Crítico";
  if (actual <= minimo)        return "Bajo";
  return "Normal";
}

function calcularEstadoVencimiento(fecha) {
  if (!fecha) return null;
  const hoy   = new Date();
  const venc  = new Date(fecha);
  const dias  = Math.ceil((venc - hoy) / (1000 * 60 * 60 * 24));
  if (dias < 0)   return { label: "Vencido",            color: "#c0392b", bg: "#fce8e8", dias };
  if (dias <= 30) return { label: `Vence en ${dias}d`,  color: "#b7860b", bg: "#fef8e7", dias };
  if (dias <= 90) return { label: `Vence en ${dias}d`,  color: "#2c5f9e", bg: "#e8f0fb", dias };
  return { label: "Vigente", color: "#1a6b40", bg: "#e8f5ee", dias };
}

const INVENT_VACIO = {
  nombre:"", categoria:"", tipo:"Medicamento", actual:0, minimo:0,
  precio:0, vencimiento:"", lote:"", proveedor:"", notas:"",
};

function InventarioView({ inventario, setInventario, movimientos, setMovimientos }) {
  const [busqueda,      setBusqueda]      = useState("");
  const [filtroCateg,   setFiltroCateg]   = useState("Todos");
  const [filtroEstado,  setFiltroEstado]  = useState("Todos");
  const [filtroTipo,    setFiltroTipo]    = useState("Todos");
  const [modal,         setModal]         = useState(null);   // null | "nuevo" | objeto
  const [modalMov,      setModalMov]      = useState(null);   // null | producto
  const [modalAlerta,   setModalAlerta]   = useState(false);
  const [tab,           setTab]           = useState("inventario"); // "inventario" | "movimientos"
  const [form,          setForm]          = useState(INVENT_VACIO);
  const [movForm,       setMovForm]       = useState({ tipo:"Entrada", cantidad:1, motivo:"", responsable:"Admin" });

  // ── filtrado ──
  const filtrados = inventario.filter(p => {
    const txt = busqueda.toLowerCase();
    const matchText = p.nombre.toLowerCase().includes(txt) || p.proveedor?.toLowerCase().includes(txt) || p.lote?.toLowerCase().includes(txt);
    const estadoCalc = calcularEstadoInv(p.actual, p.minimo);
    const matchCat   = filtroCateg  === "Todos" || p.categoria === filtroCateg;
    const matchEst   = filtroEstado === "Todos" || estadoCalc  === filtroEstado;
    const matchTipo  = filtroTipo   === "Todos" || p.tipo      === filtroTipo;
    return matchText && matchCat && matchEst && matchTipo;
  });

  // ── KPIs ──
  const agotados   = inventario.filter(p => p.actual === 0).length;
  const criticos   = inventario.filter(p => calcularEstadoInv(p.actual, p.minimo) === "Crítico").length;
  const bajos      = inventario.filter(p => calcularEstadoInv(p.actual, p.minimo) === "Bajo").length;
  const vencProx   = inventario.filter(p => { const v = calcularEstadoVencimiento(p.vencimiento); return v && v.dias <= 30 && v.dias >= 0; }).length;
  const vencidos   = inventario.filter(p => { const v = calcularEstadoVencimiento(p.vencimiento); return v && v.dias < 0; }).length;
  const alertaTotal = agotados + criticos + vencidos;

  function abrirNuevo() { setForm(INVENT_VACIO); setModal("nuevo"); }
  function abrirEditar(p) { setForm({ ...p }); setModal(p); }
  function handleChange(e) { setForm(pr => ({ ...pr, [e.target.name]: e.target.value })); }
  function guardar(e) {
    e.preventDefault();
    const entry = {
      ...form,
      id:     modal === "nuevo" ? Date.now() : form.id,
      actual: Number(form.actual),
      minimo: Number(form.minimo),
      precio: Number(form.precio),
    };
    if (modal === "nuevo") setInventario(p => [...p, entry]);
    else setInventario(p => p.map(x => x.id === modal.id ? entry : x));
    setModal(null);
  }
  function eliminar(id) {
    if (window.confirm("¿Eliminar este producto del inventario?"))
      setInventario(p => p.filter(x => x.id !== id));
      setProductos(p => p.filter(x => x.id !== id));
  }

  // ── movimientos ──
  function abrirMovimiento(prod) { setModalMov(prod); setMovForm({ tipo:"Entrada", cantidad:1, motivo:"", responsable:"Admin" }); }
  function guardarMovimiento(e) {
    e.preventDefault();
    const cant = Number(movForm.cantidad);
    const delta = movForm.tipo === "Salida" ? -cant : movForm.tipo === "Entrada" ? cant : (movForm.tipo === "Ajuste" ? cant : cant);
    setInventario(p => p.map(x => x.id === modalMov.id
      ? { ...x, actual: Math.max(0, x.actual + delta) }
      : x
    ));
    
    setProductos(p => p.map(x => x.id === modalMov.id
  ? { ...x, actual: Math.max(0, x.actual + delta), estado: calcularEstadoInv(Math.max(0, x.actual + delta), x.minimo) }
  : x
));
    setMovimientos(p => [...p, {
      id: Date.now(), producto_id: modalMov.id,
      tipo: movForm.tipo, cantidad: movForm.tipo === "Ajuste" ? delta : cant,
      fecha: new Date().toISOString().slice(0, 10),
      responsable: movForm.responsable, motivo: movForm.motivo,
    }]);
    setModalMov(null);
  }

  // ── alertas críticas (productos a mostrar en panel alerta) ──
  const productosAlerta = inventario.filter(p => {
    const est = calcularEstadoInv(p.actual, p.minimo);
    const venc = calcularEstadoVencimiento(p.vencimiento);
    return est === "Agotado" || est === "Crítico" || (venc && venc.dias <= 30);
  });

  // ── Estilos badge estado ──
  const badgeEstado = (actual, minimo) => {
    const est = calcularEstadoInv(actual, minimo);
    const map = {
      Agotado: { bg:"#f3e5e5", color:"#8b1a1a" },
      Crítico: { bg:"#fce8e8", color:"#c0392b" },
      Bajo:    { bg:"#fef8e7", color:"#b7860b" },
      Normal:  { bg:"#e8f5ee", color:"#1a6b40" },
    };
    const s = map[est] || map.Normal;
    return <span style={{ display:"inline-block",padding:"2px 10px",borderRadius:12,fontSize:11,fontWeight:500,background:s.bg,color:s.color }}>{est}</span>;
  };

  const badgeVenc = (fecha) => {
    const v = calcularEstadoVencimiento(fecha);
    if (!v) return <span style={{ fontSize:11,color:C.textoSec }}>—</span>;
    return <span style={{ display:"inline-block",padding:"2px 8px",borderRadius:12,fontSize:11,fontWeight:500,background:v.bg,color:v.color }}>{v.label}</span>;
  };

  // ── barrita de stock visual ──
  const BarraStock = ({ actual, minimo }) => {
    const maximo = Math.max(minimo * 2, actual, 1);
    const pct    = Math.min((actual / maximo) * 100, 100);
    const color  = actual === 0 ? "#c0392b" : actual <= minimo * 0.5 ? "#c0392b" : actual <= minimo ? "#b7860b" : "#1a6b40";
    return (
      <div style={{ display:"flex",alignItems:"center",gap:6 }}>
        <div style={{ flex:1,background:"#f3f4f6",borderRadius:4,height:6,overflow:"hidden" }}>
          <div style={{ width:`${pct}%`,height:"100%",background:color,borderRadius:4,transition:"width 0.3s" }}/>
        </div>
        <span style={{ fontSize:11,fontWeight:600,color,minWidth:28,textAlign:"right" }}>{actual}</span>
      </div>
    );
  };

  return (
    <div>
      {/* Barra de alertas críticas */}
      {alertaTotal > 0 && (
        <div style={{ background:"#fef3cd",border:"1px solid #f0c040",borderRadius:10,padding:"10px 16px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,fontSize:13 }}>
            <span style={{ fontSize:18 }}>⚠️</span>
            <span>
              <strong style={{ color:"#92630a" }}>
                {agotados > 0 && `${agotados} producto${agotados>1?"s":""} agotado${agotados>1?"s":""}`}
                {agotados > 0 && criticos > 0 && " · "}
                {criticos > 0 && `${criticos} en stock crítico`}
                {(agotados>0||criticos>0) && vencidos > 0 && " · "}
                {vencidos > 0 && `${vencidos} vencido${vencidos>1?"s":""}`}
                {vencProx > 0 && ` · ${vencProx} próximo${vencProx>1?"s":""} a vencer`}
              </strong>
            </span>
          </div>
          <button onClick={() => setModalAlerta(true)}
            style={{ padding:"4px 12px",background:"#92630a",color:"#fff",border:"none",borderRadius:6,fontSize:12,cursor:"pointer",whiteSpace:"nowrap" }}>
            Ver alertas
          </button>
        </div>
      )}

      {/* KPIs */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:14 }}>
        {[
          { label:"Total productos", valor:inventario.length,    icono:"📦", color:C.verde,    bg:C.verdeClaro },
          { label:"Agotados",        valor:agotados,             icono:"🚫", color:"#8b1a1a",  bg:"#f3e5e5"   },
          { label:"Stock crítico",   valor:criticos,             icono:"🔴", color:C.rojo,     bg:C.rojoClaro },
          { label:"Stock bajo",      valor:bajos,                icono:"🟡", color:"#b7860b",  bg:"#fef8e7"   },
          { label:"Por vencer",      valor:vencProx,             icono:"⏳", color:"#2c5f9e",  bg:"#e8f0fb"   },
        ].map(k => (
          <div key={k.label} style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,padding:"12px 14px",display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:36,height:36,borderRadius:8,background:k.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0 }}>{k.icono}</div>
            <div>
              <div style={{ fontSize:10,color:C.textoSec,marginBottom:1 }}>{k.label}</div>
              <div style={{ fontSize:18,fontWeight:700,color:k.color }}>{k.valor}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex",gap:2,marginBottom:14,borderBottom:`1px solid ${C.borde}` }}>
        {[["inventario","📦 Inventario"],["movimientos","🔄 Movimientos"]].map(([id,lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding:"8px 18px",fontSize:13,cursor:"pointer",border:"none",background:"none",
            borderBottom: tab===id ? `2px solid ${C.verde}` : "2px solid transparent",
            color: tab===id ? C.verde : C.textoSec, fontWeight: tab===id ? 600 : 400,
          }}>{lbl}</button>
        ))}
      </div>

      {/* ─── TAB INVENTARIO ─── */}
      {tab === "inventario" && (
        <div>
          {/* Filtros */}
          <div style={{ display:"flex",gap:10,marginBottom:14,alignItems:"center",flexWrap:"wrap" }}>
            <div style={{ position:"relative",flex:1,minWidth:200 }}>
              <span style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textoSec }}>🔍</span>
              <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar por nombre, proveedor o lote..."
                style={{ width:"100%",padding:"8px 12px 8px 34px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,boxSizing:"border-box" }}/>
            </div>
            {[
              { val:filtroCateg,  set:setFiltroCateg,  opts:["Todos",...CATEGORIAS_INV],   placeholder:"Categoría"  },
              { val:filtroTipo,   set:setFiltroTipo,   opts:["Todos",...TIPOS_PRODUCTO],   placeholder:"Tipo"       },
              { val:filtroEstado, set:setFiltroEstado, opts:["Todos","Normal","Bajo","Crítico","Agotado"], placeholder:"Estado" },
            ].map((f,i) => (
              <select key={i} value={f.val} onChange={e=>f.set(e.target.value)}
                style={{ padding:"7px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:12,background:C.blanco,minWidth:120 }}>
                {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ))}
            <Btn onClick={abrirNuevo}>+ Nuevo Producto</Btn>
          </div>

          {/* Tabla */}
          <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,overflow:"hidden" }}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
              <TablaCabecera cols={["#","Producto","Tipo","Categoría","Stock","Mín.","Precio","Vencimiento","Lote","Estado","Acciones"]}/>
              <tbody>
                {filtrados.length === 0 ? <FilaVacia cols={11}/> : filtrados.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom:`0.5px solid ${C.borde}`,background:i%2===0?C.blanco:"#fafafa" }}>
                    <td style={{ padding:"9px 10px",color:C.textoSec,fontSize:11 }}>{i+1}</td>
                    <td style={{ padding:"9px 10px" }}>
                      <div style={{ fontWeight:500 }}>{p.nombre}</div>
                      {p.proveedor && <div style={{ fontSize:11,color:C.textoSec }}>{p.proveedor}</div>}
                    </td>
                    <td style={{ padding:"9px 10px",color:C.textoSec }}>{p.tipo}</td>
                    <td style={{ padding:"9px 10px",color:C.textoSec }}>{p.categoria}</td>
                    <td style={{ padding:"9px 10px",minWidth:100 }}><BarraStock actual={p.actual} minimo={p.minimo}/></td>
                    <td style={{ padding:"9px 10px",color:C.textoSec,textAlign:"center" }}>{p.minimo}</td>
                    <td style={{ padding:"9px 10px" }}>${Number(p.precio).toLocaleString()}</td>
                    <td style={{ padding:"9px 10px" }}>{badgeVenc(p.vencimiento)}</td>
                    <td style={{ padding:"9px 10px",color:C.textoSec,fontSize:12 }}>{p.lote||"—"}</td>
                    <td style={{ padding:"9px 10px" }}>{badgeEstado(p.actual, p.minimo)}</td>
                    <td style={{ padding:"9px 10px",whiteSpace:"nowrap" }}>
                      <BtnIcono onClick={()=>abrirMovimiento(p)} title="Registrar movimiento" bgColor="#e8f0fb" color="#2c5f9e">🔄</BtnIcono>
                      <BtnIcono onClick={()=>abrirEditar(p)}    title="Editar"                bgColor={C.verdeClaro} color={C.verde}>✏️</BtnIcono>
                      <BtnIcono onClick={()=>eliminar(p.id)}    title="Eliminar">🗑</BtnIcono>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginacion actual={filtrados.length} total={inventario.length}/>
          </div>
        </div>
      )}

      {/* ─── TAB MOVIMIENTOS ─── */}
      {tab === "movimientos" && (
        <div style={{ background:C.blanco,borderRadius:12,border:`0.5px solid ${C.borde}`,overflow:"hidden" }}>
          <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
            <TablaCabecera cols={["Fecha","Producto","Tipo","Cantidad","Responsable","Motivo"]}/>
            <tbody>
              {movimientos.length === 0 ? <FilaVacia cols={6} msg="Sin movimientos registrados"/> : [...movimientos].reverse().map((m, i) => {
                const prod = inventario.find(p => p.id === m.producto_id);
                const esEntrada = m.tipo === "Entrada";
                const esSalida  = m.tipo === "Salida";
                return (
                  <tr key={m.id} style={{ borderBottom:`0.5px solid ${C.borde}`,background:i%2===0?C.blanco:"#fafafa" }}>
                    <td style={{ padding:"9px 10px",color:C.textoSec }}>{m.fecha}</td>
                    <td style={{ padding:"9px 10px",fontWeight:500 }}>{prod?.nombre || "—"}</td>
                    <td style={{ padding:"9px 10px" }}>
                      <span style={{
                        display:"inline-block",padding:"2px 10px",borderRadius:12,fontSize:11,fontWeight:500,
                        background: esEntrada?"#e8f5ee": esSalida?"#fce8e8":"#e8f0fb",
                        color:      esEntrada?C.verde:   esSalida?C.rojo:   "#2c5f9e",
                      }}>{m.tipo}</span>
                    </td>
                    <td style={{ padding:"9px 10px",fontWeight:600,color:esEntrada?C.verde:esSalida?C.rojo:C.textoSec }}>
                      {esEntrada?"+":esSalida?"-":""}{Math.abs(m.cantidad)}
                    </td>
                    <td style={{ padding:"9px 10px",color:C.textoSec }}>{m.responsable}</td>
                    <td style={{ padding:"9px 10px",color:C.textoSec }}>{m.motivo||"—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── MODAL CREAR / EDITAR ─── */}
      {modal !== null && (
        <Modal titulo={modal==="nuevo"?"Nuevo Producto":"Editar Producto"} onCerrar={()=>setModal(null)} ancho={580}>
          <form onSubmit={guardar}>
            <FormGrid>
              <Input label="Nombre del producto" name="nombre"    value={form.nombre}    onChange={handleChange} required/>
              <Input label="Tipo"                name="tipo"      value={form.tipo}      onChange={handleChange} opciones={TIPOS_PRODUCTO} required/>
            </FormGrid>
            <FormGrid>
              <Input label="Categoría"  name="categoria"  value={form.categoria}  onChange={handleChange} opciones={CATEGORIAS_INV} required/>
              <Input label="Proveedor"  name="proveedor"  value={form.proveedor}  onChange={handleChange}/>
            </FormGrid>
            <FormGrid>
              <Input label="Stock actual"  name="actual"  value={form.actual}  onChange={handleChange} type="number" required/>
              <Input label="Stock mínimo"  name="minimo"  value={form.minimo}  onChange={handleChange} type="number" required/>
            </FormGrid>
            <FormGrid>
              <Input label="Precio unitario"    name="precio"      value={form.precio}      onChange={handleChange} type="number" required/>
              <Input label="Fecha de vencimiento" name="vencimiento" value={form.vencimiento} onChange={handleChange} type="date"/>
            </FormGrid>
            <FormGrid>
              <Input label="N° de lote" name="lote" value={form.lote} onChange={handleChange}/>
              <div/>
            </FormGrid>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:3 }}>Notas</label>
              <textarea name="notas" value={form.notas} onChange={handleChange} rows={2}
                placeholder="Observaciones, condiciones de almacenamiento..."
                style={{ width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,resize:"vertical",boxSizing:"border-box" }}/>
            </div>
            {/* Preview estado */}
            {(form.actual !== "" && form.minimo !== "") && (
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12,background:C.fondo,borderRadius:8,padding:"8px 12px" }}>
                <span style={{ fontSize:12,color:C.textoSec }}>Estado calculado:</span>
                {badgeEstado(Number(form.actual), Number(form.minimo))}
                {form.vencimiento && <span style={{ marginLeft:8 }}>{badgeVenc(form.vencimiento)}</span>}
              </div>
            )}
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end",marginTop:8 }}>
              <Btn outline onClick={()=>setModal(null)}>Cancelar</Btn>
              <Btn type="submit">Guardar</Btn>
            </div>
          </form>
        </Modal>
      )}

      {/* ─── MODAL REGISTRAR MOVIMIENTO ─── */}
      {modalMov !== null && (
        <Modal titulo={`Registrar movimiento — ${modalMov.nombre}`} onCerrar={()=>setModalMov(null)} ancho={440}>
          <div style={{ background:C.fondo,borderRadius:8,padding:"10px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13 }}>
            <span style={{ color:C.textoSec }}>Stock actual</span>
            <span style={{ fontSize:22,fontWeight:700,color:C.verde }}>{modalMov.actual}</span>
          </div>
          <form onSubmit={guardarMovimiento}>
            <Input label="Tipo de movimiento" name="tipo" value={movForm.tipo}
              onChange={e=>setMovForm(p=>({...p,tipo:e.target.value}))}
              opciones={["Entrada","Salida","Ajuste"]} required/>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:3 }}>
                Cantidad {movForm.tipo==="Ajuste" ? "(positivo=suma, negativo=resta)" : ""}
              </label>
              <input type="number" value={movForm.cantidad} onChange={e=>setMovForm(p=>({...p,cantidad:e.target.value}))}
                style={{ width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,boxSizing:"border-box" }} required/>
            </div>
            <Input label="Responsable" name="responsable" value={movForm.responsable}
              onChange={e=>setMovForm(p=>({...p,responsable:e.target.value}))} required/>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12,color:C.textoSec,fontWeight:500,display:"block",marginBottom:3 }}>Motivo</label>
              <input value={movForm.motivo} onChange={e=>setMovForm(p=>({...p,motivo:e.target.value}))}
                placeholder="Ej: Compra proveedor, uso en consulta, ajuste..."
                style={{ width:"100%",padding:"8px 10px",border:`1px solid ${C.borde}`,borderRadius:8,fontSize:13,boxSizing:"border-box" }}/>
            </div>
            {/* Preview resultado */}
            {movForm.cantidad !== "" && (
              <div style={{ background:C.verdeClaro,borderRadius:8,padding:"8px 14px",marginBottom:12,fontSize:13,display:"flex",justifyContent:"space-between" }}>
                <span style={{ color:C.textoSec }}>Stock resultante</span>
                <strong style={{ color:C.verde }}>
                  {Math.max(0, modalMov.actual + (
                    movForm.tipo==="Entrada" ?  Number(movForm.cantidad) :
                    movForm.tipo==="Salida"  ? -Number(movForm.cantidad) :
                                               Number(movForm.cantidad)
                  ))}
                </strong>
              </div>
            )}
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end",marginTop:8 }}>
              <Btn outline onClick={()=>setModalMov(null)}>Cancelar</Btn>
              <Btn type="submit">Registrar</Btn>
            </div>
          </form>
        </Modal>
      )}

      {/* ─── MODAL ALERTAS ─── */}
      {modalAlerta && (
        <Modal titulo="⚠️ Productos en alerta" onCerrar={()=>setModalAlerta(false)} ancho={580}>
          {productosAlerta.length === 0
            ? <p style={{ color:C.textoSec,fontSize:13,textAlign:"center",padding:24 }}>Sin alertas activas 🎉</p>
            : productosAlerta.map(p => {
              const est  = calcularEstadoInv(p.actual, p.minimo);
              const venc = calcularEstadoVencimiento(p.vencimiento);
              return (
                <div key={p.id} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`0.5px solid ${C.borde}`,gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:500,fontSize:13 }}>{p.nombre}</div>
                    <div style={{ fontSize:11,color:C.textoSec }}>{p.proveedor} · Lote {p.lote||"—"}</div>
                  </div>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end" }}>
                    {(est==="Agotado"||est==="Crítico") && badgeEstado(p.actual, p.minimo)}
                    {venc && venc.dias <= 30 && badgeVenc(p.vencimiento)}
                  </div>
                  <div style={{ fontSize:12,color:C.textoSec,minWidth:70,textAlign:"right" }}>
                    Stock: <strong>{p.actual}</strong> / {p.minimo}
                  </div>
                </div>
              );
            })
          }
          <div style={{ display:"flex",justifyContent:"flex-end",marginTop:16 }}>
            <Btn onClick={()=>setModalAlerta(false)}>Cerrar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR

const MENU = [
  {id:"dashboard",     label:"Panel de Control",  icono:"🏠"},
  {id:"clientes",      label:"Clientes",           icono:"👥"},
  {id:"mascotas",      label:"Mascotas",            icono:"🐾"},
  {id:"citas",         label:"Citas",               icono:"📅"},
  {id:"historial",     label:"Historial Clínico",   icono:"🗂"},
  {id:"veterinarios",  label:"Veterinarios",        icono:"🩺"},
  {id:"servicios",     label:"Servicios",           icono:"🛎"},
  {id:"productos",     label:"Productos",           icono:"📦"},
  {id:"inventario",    label:"Inventario",          icono:"📋"},
  {id:"facturacion",   label:"Facturación",         icono:"🧾"},
  {id:"reportes",      label:"Reportes",            icono:"📊"},
  {id:"recordatorios", label:"Recordatorios",       icono:"🔔"},
  {id:"configuracion", label:"Configuración",       icono:"⚙️"},
];

function Sidebar({activa,onNavigate}) {
  return (
    <aside style={{width:220,minWidth:220,background:C.verde,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"20px 16px 16px",borderBottom:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:36,height:36,background:"rgba(255,255,255,0.15)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🐾</div>
        <div>
          <div style={{color:"#fff",fontSize:15,fontWeight:600}}>DermaVet</div>
          <div style={{color:"rgba(255,255,255,0.55)",fontSize:11}}>Salud y bienestar animal</div>
        </div>
      </div>
      <nav style={{padding:"12px 8px",flex:1,overflowY:"auto"}}>
        {MENU.map(item=>(
          <div key={item.id} onClick={()=>onNavigate(item.id)} style={{
            display:"flex",alignItems:"center",gap:10,padding:"9px 10px",
            borderRadius:8,marginBottom:2,cursor:"pointer",fontSize:13,
            color:activa===item.id?"#fff":"rgba(255,255,255,0.7)",
            fontWeight:activa===item.id?500:400,
            background:activa===item.id?"rgba(255,255,255,0.18)":"transparent",
            transition:"all 0.15s"}}>
            <span style={{fontSize:15}}>{item.icono}</span>{item.label}
          </div>
        ))}
      </nav>
      <div style={{padding:16,borderTop:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.4)",fontSize:11,textAlign:"center"}}>
        🐾 Cuidamos su piel,<br/>cuidamos su bienestar
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────────────────────────────────────

function TopBar({titulo}) {
  return (
    <header style={{height:56,background:C.blanco,borderBottom:`0.5px solid ${C.borde}`,
      display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",flexShrink:0}}>
      <div style={{fontSize:17,fontWeight:500,display:"flex",alignItems:"center",gap:8}}>
        <span style={{color:C.verde}}>DermaVet</span> – {titulo}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{position:"relative",cursor:"pointer"}}>
          <span style={{fontSize:20}}>🔔</span>
          <span style={{position:"absolute",top:-4,right:-4,width:16,height:16,background:C.rojo,
            borderRadius:"50%",fontSize:10,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>3</span>
        </div>
        <div style={{width:32,height:32,borderRadius:"50%",background:C.verde,color:"#fff",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:500}}>AD</div>
        <div>
          <div style={{fontSize:13,fontWeight:500}}>Admin</div>
          <div style={{fontSize:11,color:C.textoSec}}>Administrador</div>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP RAÍZ
// ─────────────────────────────────────────────────────────────────────────────

const TITULOS = {
  dashboard:"Panel de Control",  clientes:"Clientes",           mascotas:"Mascotas Registradas",
  citas:"Citas Próximas",        historial:"Historial Clínico",  veterinarios:"Veterinarios",
  servicios:"Catálogo de Servicios", productos:"Productos",     inventario:"Inventario",
  facturacion:"Facturación",     reportes:"Reportes",           recordatorios:"Recordatorios",
  configuracion:"Configuración",
};

export default function DermaVetApp() {
  const [vista,        setVista]        = useState("dashboard");
  const [clientes,     setClientes]     = useState(DATOS_CLIENTES);
  const [mascotas,     setMascotas]     = useState(DATOS_MASCOTAS);
  const [citas,        setCitas]        = useState(DATOS_CITAS);
  const [productos,    setProductos]    = useState(DATOS_PRODUCTOS);
  const [veterinarios, setVeterinarios] = useState(DATOS_VETERINARIOS);
  const [historiales,  setHistoriales]  = useState(DATOS_HISTORIALES);
  const [servicios,    setServicios]    = useState(DATOS_SERVICIOS);
  const [facturas, setFacturas]         = useState(DATOS_FACTURAS);
  const [inventario,    setInventario]    = useState(DATOS_INVENTARIO);
  const [movimientos,   setMovimientos]   = useState(DATOS_MOVIMIENTOS);

  function renderVista() {
    switch(vista) {
      case "dashboard":    return <Dashboard       clientes={clientes}       mascotas={mascotas}         citas={citas}        productos={productos}   onNavigate={setVista}/>;
      case "clientes":     return <ClientesView    clientes={clientes}       setClientes={setClientes}/>;
      case "mascotas":     return <MascotasView    mascotas={mascotas}       setMascotas={setMascotas}   clientes={clientes}  historiales={historiales} citas={citas}/>;
      case "citas":        return <CitasView       citas={citas}             setCitas={setCitas}         mascotas={mascotas}  veterinarios={veterinarios}/>;
      case "historial":    return <HistorialView   historiales={historiales} setHistoriales={setHistoriales} mascotas={mascotas} veterinarios={veterinarios}/>;
      case "veterinarios": return <VeterinariosView veterinarios={veterinarios} setVeterinarios={setVeterinarios}/>;
      case "servicios":    return <ServiciosView   servicios={servicios}     setServicios={setServicios}/>;
      case "productos":    return <ProductosView   productos={productos}     setProductos={setProductos}/>;
      case "inventario": return <InventarioView
  inventario={inventario}       setInventario={setInventario}
  movimientos={movimientos}     setMovimientos={setMovimientos}
  productos={productos}         setProductos={setProductos}/>;
      case "facturacion":  return <FacturacionView facturas={facturas} setFacturas={setFacturas} clientes={clientes} mascotas={mascotas} servicios={servicios} productos={productos}/>;
      case "reportes":     return <ReportesView facturas={facturas} citas={citas} clientes={clientes} mascotas={mascotas} servicios={servicios}/>;
      case "recordatorios":return <Proximamente icono="🔔" titulo="Recordatorios"/>;
      case "configuracion":return <Proximamente icono="⚙️" titulo="Configuración"/>;
      default:             return <Proximamente icono="🚧" titulo="En desarrollo"/>;
    }
  }

  return (
    <div style={{display:"flex",height:"100vh",background:C.fondo,
      fontFamily:"system-ui,-apple-system,sans-serif",fontSize:14}}>
      <Sidebar activa={vista} onNavigate={setVista}/>
      <main style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <TopBar titulo={TITULOS[vista]||vista}/>
        <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}>
          {renderVista()}
        </div>
      </main>
    </div>
  );
}
