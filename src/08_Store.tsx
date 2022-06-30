import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStyles } from './00_Share';
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
    let db = await openDatabase({name: 'sqlite.db', location: 'default'});
    return db;
};

export const initializeDatabase = async (db: SQLiteDatabase) => {
    await db.executeSql('CREATE TABLE IF NOT EXISTS Version (version FLOAT NOT NULL)');
    let dbVersion = await getDBVersion(db);
    if (dbVersion < 0.001) {
        await setDBVersion(db, 0.001);
    }
};

export const getDBVersion = async (db: SQLiteDatabase): Promise<number> => {
    const results = await db.executeSql('SELECT version FROM Version');
    if (results.length > 0) {
        if (results[0].rows.length > 0) {
            return results[0].rows.item(0).version;
        }
    }
    return 0.0;
};

// Do I need a transaction here?
export const setDBVersion = async (db: SQLiteDatabase, version: number): Promise<number> => {
    await db.executeSql(`INSERT INTO Version VALUES (${version});`);
    debugger;
    return version;
};

interface TableListener {
    tableName: string;
    callback: (table: any) => void;
    remove: () => void;
}

let tableListeners: TableListener[] = [];

function addTableListener(tableName: string, callback: (table: any) => void): TableListener {
    const o = {tableName: tableName, callback: callback, remove: () => {
        tableListeners = tableListeners.filter((l) => { return l !== o; });
    }};
    tableListeners.push(o);
    return o;
}

export const refreshTable = async (tableName: string) => {
    const db = await getDBConnection();
    await initializeDatabase(db);
    const results = await db.executeSql(`SELECT * FROM ${tableName}`); // Guard SQL injection with types
    for (var i = 0; i < tableListeners.length; i++) {
        const l = tableListeners[i];
        if (l.tableName == tableName) {
            l.callback(results[0].rows.raw());
        }
    }
};

function useVersion() {
    const [version, setVersion] = useState(0.0);
    const callback = (newTable: any) => {
        debugger;
        setVersion(newTable[0].version);
    }
    useEffect(() => {
        const sub = addTableListener('Version', callback);
        refreshTable('Version');
        return () => sub.remove();
    });
    return version;
}

const SQLiteViewer = () => {
    const Styles = useStyles();
    const version = useVersion();
    
    return (<SafeAreaView style={Styles.safeArea}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={Styles.text}>Database Version: {version}</Text>
        </View>
    </SafeAreaView>);
};

export default SQLiteViewer;