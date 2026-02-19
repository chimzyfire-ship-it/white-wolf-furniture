export const products = [
    {
        id: 2,
        name: "Royal Gilded Throne Set",
        price: "$TBD",
        image: "/assets/real-photos/0ee9eaf8-e9d8-451d-b1e5-c33174f24cff.JPG",
        description: "Hand-carved ornate living set with gold leaf finishing and velvet upholstery."
    },
    {
        id: 3,
        name: "Tobacco Suede L-Sectional",
        price: "$TBD",
        image: "/assets/real-photos/0f204c24-39fa-45f9-82ac-5ec44d58e84d.JPG",
        description: "Deep-seated L-shaped sectional in premium tobacco suede with contrast stitching."
    },
    {
        id: 4,
        name: "Artisanal Oak Shoe Rack",
        price: "$TBD",
        image: "/assets/real-photos/2448f4bc-4921-4d12-b200-3c85fb6136f7.JPG",
        description: "Solid oak multi-tier storage unit with a natural protective lacquer finish."
    },
    {
        id: 5,
        name: "Luxury Velvet Bed Frame",
        price: "$TBD",
        image: "/assets/real-photos/c63cfe8d-df2b-4cd3-b38f-69039154e99f.JPG",
        description: "Plush vertical-tufted headboard with gold inlay accents and reinforced base."
    },
    {
        id: 6,
        name: "Minimalist Wall Wine Rack",
        price: "$TBD",
        image: "/assets/real-photos/b4beb8b7-60eb-4965-b64b-879d93945893.JPG",
        description: "Staggered geometric wine storage with integrated glass holders and matte finish."
    },
    {
        id: 7,
        name: "Custom Walk-in Closet",
        price: "$TBD",
        image: "/assets/real-photos/4c913816-bd47-4660-9102-f8107b9a0b3e.JPG",
        description: "Tailor-made organizational system with soft-close drawers and integrated lighting."
    },
    {
        id: 8,
        name: "Glow Entertainment Center",
        price: "$TBD",
        image: "/assets/real-photos/1eb29873-46dc-44f2-8225-77cbff6e9d6e.JPG",
        description: "Sleek media unit featuring floating shelves and ambient LED integration."
    }
];

// ─── Gallery Categories ─────────────────────────────────────────────
export interface GalleryCategory {
    id: string;
    name: string;
    tagline: string;
    description: string;
    cover: string;
    images: string[];
}

export const galleryCategories: GalleryCategory[] = [
    {
        id: 'doors',
        name: 'Doors',
        tagline: 'Entryways That Speak',
        description: 'Custom-crafted doors from solid hardwood — designed to make a statement at every threshold.',
        cover: '/assets/categories/doors/df5252da-e99d-4676-bf5f-e621ed20ed8b.JPG',
        images: [
            '/assets/categories/doors/df5252da-e99d-4676-bf5f-e621ed20ed8b.JPG',
            '/assets/categories/doors/0d2c31c1-4c80-446f-a8b6-65e85e4ad354.JPG',
            '/assets/categories/doors/a364cabc-bc21-48c3-8024-0c28f97da421.JPG',
            '/assets/categories/doors/819da1aa-48bc-44b3-9271-070af9abf207.JPG',
            '/assets/categories/doors/edcc63ec-3b67-49e8-a4d0-79d73de3b2ba.JPG',
        ]
    },
    {
        id: 'sofas',
        name: 'Sofas & Sets',
        tagline: 'Comfort Meets Craft',
        description: 'Hand-upholstered living sets built on reinforced hardwood frames for lasting luxury.',
        cover: '/assets/categories/sofas-and-sets/a3847981-7b83-4578-9e68-0a299d7ed5cd.JPG',
        images: [
            '/assets/categories/sofas-and-sets/a3847981-7b83-4578-9e68-0a299d7ed5cd.JPG',
            '/assets/categories/sofas-and-sets/a2af8336-8096-4ece-ba0c-87978f00aaf2.JPG',
            '/assets/categories/sofas-and-sets/04fadec6-f4da-4663-92ef-67101d0df272.JPG',
            '/assets/categories/sofas-and-sets/8d5407c0-4ec8-4eae-9a69-ea426adae18a.JPG',
            '/assets/categories/sofas-and-sets/944fb46f-9572-4d0a-a038-dd46a2b06851.JPG',
            '/assets/categories/sofas-and-sets/29473572-768a-46e9-9a38-f1e12014f561.JPG',
            '/assets/categories/sofas-and-sets/5a761839-2afe-4b36-b0c8-b4f4ded5ed90.JPG',
            '/assets/categories/sofas-and-sets/c29ae21e-58bc-48c0-bdfe-7a2c2699c771.JPG',
            '/assets/categories/sofas-and-sets/026d2e57-025e-45d9-93ca-6e3f3e3a04f9.JPG',
            '/assets/categories/sofas-and-sets/fbc74956-f091-43f9-9fe3-661fd8d190c3.JPG',
            '/assets/categories/sofas-and-sets/98abf781-bb6d-4ee3-aee2-96e79e880325.JPG',
            '/assets/categories/sofas-and-sets/c1a8a796-6cf2-4d14-bbbf-b84f8468053c.JPG',
            '/assets/categories/sofas-and-sets/0d258a4c-7ed9-4e9d-a66a-2a046fd6ed87.JPG',
            '/assets/categories/sofas-and-sets/5fd563d9-2566-4372-86b4-a4564a4403fe.JPG',
            '/assets/categories/sofas-and-sets/d9614485-7824-4f46-96a7-163d678d2532.JPG',
            '/assets/categories/sofas-and-sets/2654d5d3-dc6d-4c96-9a7a-97902862706e.JPG',
            '/assets/categories/sofas-and-sets/da1d517d-2a33-4898-b27f-8a34cc656134.JPG',
            '/assets/categories/sofas-and-sets/1c0f3cdd-e689-44bc-a0f9-e6c63f09ed29.JPG',
            '/assets/categories/sofas-and-sets/5d243bbe-f0f5-405d-84d7-91af1be57bd2.JPG',
            '/assets/categories/sofas-and-sets/029d5549-8581-4df4-8a6a-7e5c218361af.JPG',
            '/assets/categories/sofas-and-sets/f751b891-1b93-4997-971c-cbb50e839fc4.JPG',
            '/assets/categories/sofas-and-sets/05eb7631-b416-42ae-a5d8-2a780e491279.JPG',
            '/assets/categories/sofas-and-sets/3c880da9-6b47-442f-a91a-1184b1e8e4a8.JPG',
        ]
    },
    {
        id: 'beds',
        name: 'Beds',
        tagline: 'Rest in Artistry',
        description: 'Tufted headboards, gilded frames, and bespoke bed designs that redefine bedroom luxury.',
        cover: '/assets/categories/beds/46150a16-2a2a-41ee-84be-9e6c31a53c8b.JPG',
        images: [
            '/assets/categories/beds/46150a16-2a2a-41ee-84be-9e6c31a53c8b.JPG',
            '/assets/categories/beds/3f27d040-7080-4ea7-a79c-c34843146105.JPG',
            '/assets/categories/beds/5747e46b-c570-42ad-98c7-ca3b326f6960.JPG',
            '/assets/categories/beds/455fe57b-b86a-4323-a045-60d810a43279.JPG',
            '/assets/categories/beds/d3d7efdf-b34c-4e94-af61-3e9f5356427d.JPG',
            '/assets/categories/beds/11b19a5d-1166-45df-9fa8-536633f29365.JPG',
            '/assets/categories/beds/60f2ff10-6e83-41df-bd1e-a6d2a5a41b68.JPG',
            '/assets/categories/beds/f056ac7a-cff4-49ef-bfe3-5fbab43e866c.JPG',
            '/assets/categories/beds/3a9a43cd-aef1-4825-ac00-7085f0d99aa5.JPG',
            '/assets/categories/beds/687c0605-8549-4bf1-ad6f-3cf37e424974.JPG',
            '/assets/categories/beds/6668d45c-88f5-4186-b583-b38a0f6664f3.JPG',
            '/assets/categories/beds/1c1d9bb0-ef2c-42be-b3ac-2906d88036d4.JPG',
            '/assets/categories/beds/8710e2d9-50a2-4d4e-a27c-4c2079df9549.JPG',
            '/assets/categories/beds/8d59b0a6-ca08-47ed-880b-3a7cb9a5f5bb.JPG',
            '/assets/categories/beds/0ddb1cfa-f537-478f-a855-c45f32ab8977.JPG',
            '/assets/categories/beds/f0467eec-24ed-4da3-a56d-3f02eb4ebb16.JPG',
            '/assets/categories/beds/fbeaad33-155a-49a3-94c9-51921a764c52.JPG',
            '/assets/categories/beds/01bef27a-0e9f-4f37-aabc-78b229d3fe63.JPG',
            '/assets/categories/beds/98a65293-3787-43ba-acc5-ef022bc21feb.JPG',
            '/assets/categories/beds/276e359d-78df-4e97-8a2d-3917910c69db.JPG',
            '/assets/categories/beds/58f7b5c5-9923-4d7f-bbdf-fdf11be57005.JPG',
            '/assets/categories/beds/ae8f8c81-079b-49f9-8ec0-b6a1be95c957.JPG',
            '/assets/categories/beds/e624d646-0787-4758-b71a-d320b0e5bb5d.JPG',
            '/assets/categories/beds/3a895151-3079-4724-a339-2ed8b58efa27.JPG',
            '/assets/categories/beds/f9dea6eb-1ef1-49da-94f0-5ef8b82d090f.JPG',
            '/assets/categories/beds/5763163d-8167-4976-9d99-7668af41cabe.JPG',
            '/assets/categories/beds/c69668a0-72cc-4b50-8818-2de77046c605.JPG',
            '/assets/categories/beds/00e1d7ea-d6c3-4314-a79c-3450f9ae01c1.JPG',
        ]
    }
];

// Keep flat list for backward compat
export const galleryImages = [
    "/assets/real-photos/0b044311-2374-40c3-8cbc-b566b7093e19.JPG",
    "/assets/real-photos/0ee9eaf8-e9d8-451d-b1e5-c33174f24cff.JPG",
    "/assets/real-photos/0f204c24-39fa-45f9-82ac-5ec44d58e84d.JPG",
    "/assets/real-photos/0fb85de1-39c4-4d39-91b3-8ebd051715a7.JPG",
    "/assets/real-photos/16e23f66-cff3-4758-9709-63729109b7de.JPG",
    "/assets/real-photos/1a42dddc-4e57-4f0a-b0b1-0b979ff7b0d2.JPG",
    "/assets/real-photos/1eb29873-46dc-44f2-8225-77cbff6e9d6e.JPG",
    "/assets/real-photos/2448f4bc-4921-4d12-b200-3c85fb6136f7.JPG",
    "/assets/real-photos/281fe61a-5160-479e-9198-dccc7a3c5384.JPG",
    "/assets/real-photos/2a9b34a5-1fb2-41c8-a949-017141d9e328.JPG",
    "/assets/real-photos/2babe643-3a3d-4132-a64c-2b7c9efef90b.JPG",
    "/assets/real-photos/39f7c32e-9617-49d4-8fcc-24c9272c8130.JPG",
    "/assets/real-photos/4c142611-58d6-4593-ae4b-8096a380dc61.JPG",
    "/assets/real-photos/4c913816-bd47-4660-9102-f8107b9a0b3e.JPG",
    "/assets/real-photos/5b102018-2662-42b0-92a6-3afd423dc9be.JPG",
    "/assets/real-photos/5e4a3cbf-7559-4e6d-b9a4-ca2c83560e2d.JPG",
    "/assets/real-photos/5f9cb748-af39-49c3-83aa-c9af2e91a348.JPG",
    "/assets/real-photos/616aa5a3-644c-4240-94fa-c70dcc1db5bd.JPG",
    "/assets/real-photos/66f04847-3d19-4766-b176-4cd47900817c.JPG",
    "/assets/real-photos/676020ac-3bb8-4cda-9cfc-2d8002c3cf05.JPG",
    "/assets/real-photos/68b5b282-16c9-4c73-abd3-37effa32e2e7.JPG",
    "/assets/real-photos/69765786-02e9-4790-a08d-c22ef9d969af.JPG",
    "/assets/real-photos/6ed1d439-91f5-4ed6-a3a4-28ac6fff7eef.JPG",
    "/assets/real-photos/75660fb9-b1eb-4a4a-8f5f-47650043d3df.JPG",
    "/assets/real-photos/763af519-23cc-42a7-bf34-b763ad8740fe.JPG",
    "/assets/real-photos/7a478798-ff69-4918-8259-3eef9c6cf890.JPG",
    "/assets/real-photos/823a84f9-d0d6-4489-9bd4-b541cdd533f2.JPG",
    "/assets/real-photos/87caed84-07ad-4561-a787-6ef4c52a6fb1.JPG",
    "/assets/real-photos/886a5b3d-37a8-4667-85f6-4681ee5afb60.JPG",
    "/assets/real-photos/8cec0f02-3080-4999-851e-6d936065529a.JPG",
    "/assets/real-photos/8e93370c-475e-476e-8b8b-63f27f2b84a9.JPG",
    "/assets/real-photos/978efd5e-2e17-48b9-b8c0-5a12f2ea758a.JPG",
    "/assets/real-photos/99691bc8-cb19-472a-9cd6-84b07a11023f.JPG",
    "/assets/real-photos/9a18032d-98ba-4122-824b-efb42bb29331.JPG",
    "/assets/real-photos/9dd50f39-bed8-409d-89f5-e5de3884e764.JPG",
    "/assets/real-photos/a273e8f9-5da3-49da-970d-cf0c4c0a92e3.JPG",
    "/assets/real-photos/a93b6fd6-8aa2-47ff-a991-e65c5e29b3f4.JPG",
    "/assets/real-photos/b1b57ad1-670d-4e36-9174-3dfa4e475b1b.JPG",
    "/assets/real-photos/b4beb8b7-60eb-4965-b64b-879d93945893.JPG",
    "/assets/real-photos/b90fde4d-2a00-4ed0-bb60-914379aff74f.JPG",
    "/assets/real-photos/bb1f6537-e02d-4801-bc54-b21f838e7cbe.JPG",
    "/assets/real-photos/c63cfe8d-df2b-4cd3-b38f-69039154e99f.JPG",
    "/assets/real-photos/c79ddf5c-8f67-43c3-98cf-5e4fa96f03a4.JPG",
    "/assets/real-photos/dc993e9d-a8f3-408e-9d7f-39605e2f5219.JPG",
    "/assets/real-photos/e0205f07-b16c-43f4-9f26-a613728f6f23.JPG",
    "/assets/real-photos/e036dff2-db88-450f-9ec0-e87f19da71d0.JPG",
    "/assets/real-photos/e393c529-138b-4f91-b354-e10b0614d2b6.JPG",
    "/assets/real-photos/e5cce75b-7160-4d25-b9f4-a7d765c3586d.JPG",
    "/assets/real-photos/ea56f884-ba91-4b9b-a09d-89a73c7c4a4f.JPG",
    "/assets/real-photos/ee529511-7ae8-4b6f-90b2-16616f210025.JPG",
    "/assets/real-photos/ef168856-d4a4-4bf8-afd1-39a038164dd7.JPG",
    "/assets/real-photos/f23bf14a-db5e-4e73-9c95-72548da93af1.JPG",
    "/assets/real-photos/f263c427-f967-421d-ba13-6d58e671ba08.JPG",
    "/assets/real-photos/f7382742-315c-4240-9aa5-612eecb0680e.JPG",
    "/assets/real-photos/fb5cebf1-f1a4-4674-a517-a8d1c15f4598.JPG",
    "/assets/real-photos/ffdcfd6e-e9ed-4f3c-be65-37706b898ed4.JPG"
];
