import './common.js';

// RECORD VALUE METHODS
Object.assign(xelib, {
    EditorID: function(_id) {
        if (!xelib.HasElement(_id, 'EDID')) return;
        return xelib.GetValue(_id, 'EDID');
    },
    FullName: function(_id) {
        if (!xelib.HasElement(_id, 'FULL')) return;
        return xelib.GetValue(_id, 'FULL');
    },
    Translate: function(_id, vector) {
        let position = xelib.GetElement(_id, 'DATA\\Position');
        ['X', 'Y', 'Z'].forEach(function(coord) {
            if (vector.hasOwnProperty(coord)) {
                let newValue = xelib.GetFloatValue(position, coord) + vector[coord];
                xelib.SetFloatValue(position, coord, newValue);
            }
        });
    },
    Rotate: function(_id, vector) {
        let rotation = xelib.GetElement(_id, 'DATA\\Rotation');
        ['X', 'Y', 'Z'].forEach(function(coord) {
            if (vector.hasOwnProperty(coord)) {
                let newValue = xelib.GetFloatValue(rotation, coord) + vector[coord];
                xelib.SetFloatValue(rotation, coord, newValue);
            }
        });
    },
    GetRecordFlag: function(_id, name) {
        return xelib.GetFlag(_id, 'Record Header\\Record Flags', name);
    },
    SetRecordFlag: function(_id, name, enabled) {
        xelib.SetFlag(_id, 'Record Header\\Record Flags', name, enabled);
    }
});
