import "@/styles/Home.module.css"
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Game } from "@/models/game";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { Nullable } from "primereact/ts-helpers";
import client from "@/services/axios";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Toast } from "primereact/toast";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { json } from "stream/consumers";
import React from "react";




export default function Home() {
  const toast = useRef<Toast>(null)
  const [reload, setReload] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [price, setPrice] = useState<number | null>();
  const [device, setDevice] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game>({} as Game);
  const accept = (id: number) => {
    //toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  };

  const reject = () => {

  }

  useEffect(() => {
    client.get("/api/games").then((response) => {
      setGames(response.data);
    });
  }, [reload]);

  function guardar() {
    client.post("/api/games", {
      name: name,
      company: company,
      genre: genre,
      price: price,
      device: device
    }).then(() => {
      setReload(!reload);
      setVisible(false);
      setCompany("");
      setName("");
      setPrice(null);
      setGenre("");
      setDevice("");
    })
    toast.current?.show({severity:'success', summary: 'Success', detail:'Game Succesfully created.', life: 3000});
  }

  function borrar(id: number) {
    client.delete(`/api/games/${id}`).then(() => {
      setReload(!reload);
    })
    toast.current?.show({severity:'success', summary: 'Success', detail:'Game Succesfully deleted.', life: 3000});
  }

  function edit(id: number) {
    const _selectedGame = games.find(x => x.id == id);
    setSelectedGame(_selectedGame!);
    setName(_selectedGame!.name);
    setCompany(_selectedGame!.company);
    setGenre(_selectedGame!.genre);
    setPrice(_selectedGame!.price);
    setDevice(_selectedGame!.device);
    setEditDialogVisible(true)
  }

  function guardarEdit() {
    client.put("/api/games", {
      name: name,
      company: company,
      genre: genre,
      price: price,
      device: device,
      id:selectedGame.id
    }).then(() => {
      setReload(!reload)
      setEditDialogVisible(false)
      setName("")
      setPrice(null)
      setGenre("")
      setDevice("")
      setCompany("")
    })
    toast.current?.show({severity:'success', summary: 'Success', detail:'Game Succesfully edited.', life: 3000});
  }

  function themeChange() {

  }

  function actionsTemplate(row: any) {

    return (
      <>

        <button onClick={() => edit(row.id)} className="pi pi-pencil updateBtn"></button>
        <button onClick={(e) => confirm2(e, row.id)} className="pi pi-trash deleteBtn"></button>


      </>
    )
  }
  const confirm2 = (event: any, id: number) => {

    confirmPopup({
      target: event.currentTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => borrar(id),
      reject
    });
  };

  return (
    <>
      <Toast ref={toast}/>
      <h1 className="title">Index</h1>
      <Button className="crearBtn" severity="success" onClick={() => setVisible(true)}>Crear</Button>
      <InputSwitch checked={checked} onChange={(e: InputSwitchChangeEvent) => setChecked(e.value)} />
      <DataTable className="gamesTable" value={games} tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Name"></Column>
        <Column field="company" header="Company"></Column>
        <Column field="genre" header="Genre"></Column>
        <Column field="device" header="Device"></Column>
        <Column field="price" header="Price"></Column>
        <Column header="Status" body={actionsTemplate}></Column>
      </DataTable>
      <ConfirmPopup />
      <Dialog className="createDialog" draggable={false} header="Crear Juego" visible={visible} style={{ width: '40rem' }} onHide={() => setVisible(false)}>
        <div className="formgrid grid">

          <div className="field col-12">
            <InputText className="InputText" placeholder="Name" style={{ width: "34.8rem" }} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          </div>
          <div className="field col-6">
            <InputText className="InputText" placeholder="Company" value={company} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)} />
          </div>
          <div className="field col-6">
            <InputText className="InputText" placeholder="Genre" value={genre} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(e.target.value)} />
          </div>
          <div className="field col-6">
            <InputNumber className="InputNumber" placeholder="Price" value={price} onValueChange={(e: InputNumberValueChangeEvent) => setPrice(e.value)} />
          </div>
          <div className="field col-6">
            <InputText className="InputText" placeholder="Device" value={device} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDevice(e.target.value)} />
          </div>
        </div>
        <Button className="guardarBtn" severity="success" label="Guardar" style={{ width: "34.8rem" }} onClick={guardar}></Button>
      </Dialog>

      <Dialog className="editDialog" draggable={false} header="Editar Juego" visible={editDialogVisible} style={{ width: '40rem' }} onHide={() => setEditDialogVisible(false)}>
        <div className="formgrid grid">

          <div className="field col-12">
            <InputText className="InputText" placeholder="Name" style={{ width: "34.8rem" }} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          </div>
          <div className="field col-6">
            <InputText className="InputText" placeholder="Company" value={company} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)} />
          </div>
          <div className="field col-6">
            <InputText className="InputText" placeholder="Genre" value={genre} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(e.target.value)} />
          </div>
          <div className="field col-6">
            <InputNumber className="InputNumber" placeholder="Price" value={price} onValueChange={(e: InputNumberValueChangeEvent) => setPrice(e.value)} />
          </div>
          <div className="field col-6">
            <InputText className="InputText" placeholder="Device" value={device} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDevice(e.target.value)} />
          </div>
        </div>
        <Button className="guardarBtn" severity="success" label="Guardar" style={{ width: "34.8rem" }} onClick={guardarEdit}></Button>
      </Dialog>
    </>
  )
}