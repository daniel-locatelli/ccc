CREATE TABLE component (
    id TEXT PRIMARY KEY NOT NULL,
    local TEXT NOT NULL,
    statics TEXT NOT NULL,
    structure TEXT NOT NULL,
    description TEXT,
    building_class TEXT,
    fire_rating TEXT,
    u_value NUMBER,
    lnw NUMBER,
    ci50_2500 NUMBER,
    rw NUMBER,
    c50_5000 NUMBER,
    ctr50_5000 NUMBER,
    c NUMBER,
    installation_layer BOOL,
    reference TEXT,
    super_assembly_id,
    main_assembly_id,
    sub_assembly_id,
    penrt_a1toa3 NUMBER,
    penrt_c3 NUMBER,
    penrt_c4 NUMBER,
    penrt_d1 NUMBER,
    gwp_a1toa3 NUMBER,
    gwp_c3 NUMBER,
    gwp_c4 NUMBER,
    gwp_d1 NUMBER,
    FOREIGN KEY (super_assembly_id) REFERENCES assembly(id),
    FOREIGN KEY (main_assembly_id) REFERENCES assembly(id),
    FOREIGN KEY (sub_assembly_id) REFERENCES assembly(id)
);

CREATE TABLE assembly (
    id TEXT PRIMARY KEY NOT NULL,
    lod INT NOT NULL,
    level TEXT NOT NULL,
    category TEXT,
    hierarchy TEXT NOT NULL,
    thickness NUMBER NOT NULL
);

-- I didnt use this
-- CREATE TABLE assembly_layers (
--     assembly_id NOT NULL,
--     layer_id NOT NULL,
--     FOREIGN KEY (assembly_id) REFERENCES assembly(id),
--     FOREIGN KEY (layer_id) REFERENCES layer(id)
-- );

CREATE TABLE layer (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    material_id TEXT NOT NULL,
    assembly_id TEXT NOT NULL,
    lod INT NOT NULL,
    level TEXT NOT NULL,
    option TEXT NOT NULL,
    category TEXT,
    description TEXT,
    thickness NUMBER NOT NULL,
    width NUMBER NOT NULL,
    spread NUMBER NOT NULL,
    density TEXT,
    FOREIGN KEY (material_id) REFERENCES material(id),
    FOREIGN KEY (assembly_id) REFERENCES assembly(id)
);


-- I didnt use this
-- CREATE TABLE material_options (
--     layer_id INT NOT NULL,
--     material_id TEXT NOT NULL,
--     option TEXT NOT NULL,
--     FOREIGN KEY (layer_id) REFERENCES layer(id),
--     FOREIGN KEY (material_id) REFERENCES material(id)
-- );


CREATE TABLE material (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    unit TEXT NOT NULL,
    weight NUMBER,
    conversion_factor NUMBER NOT NULL,
    penrt_a1toa3 NUMBER,
    penrt_c3 NUMBER,
    penrt_c4 NUMBER,
    penrt_d1 NUMBER,
    gwp_a1toa3 NUMBER,
    gwp_c3 NUMBER,
    gwp_c4 NUMBER,
    gwp_d1 NUMBER
);