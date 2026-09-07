(function (global) {
  'use strict';

  const OPERATIONS = {
    send: 'send', sendarray: 'sendArray', status: 'status', statuslocal: 'statusLocalMessageId',
    select: 'select', selectoutbox: 'selectOutbox', latestoutbox: 'latestOutbox', countoutbox: 'countOutbox',
    cancel: 'cancel', receive: 'receive', countinbox: 'countInbox', statusreceptor: 'statusByReceptor',
    unreads: 'unreads', inboxpaged: 'inboxPaged', groupsendreport: 'groupSendReport', account: 'accountInfo',
    accountconfig: 'accountConfig', lookup: 'verifyLookup', maketts: 'callMakeTTS', clientadd: 'addClient',
    clientupdate: 'updateClient', clientlist: 'listClients', clientfetch: 'fetchClient',
    clientfetchlocal: 'fetchClientByLocalId', clientrenew: 'renewClientKey', clientstatus: 'setClientStatus',
    clientcharge: 'chargeClientCredit', blockedadd: 'addBlockedLine', blockedremove: 'removeBlockedLine',
    blockedlist: 'listBlockedLines', blockedexists: 'blockedLineExists', templatelist: 'listTemplates',
    templateclone: 'cloneTemplate', templateadd: 'addTemplate', templateupdate: 'updateTemplate',
    templateget: 'getTemplate', templatedelete: 'deleteTemplate', mediaupload: 'uploadMedia',
    medialist: 'listMedia', mediaget: 'getMedia', mediadelete: 'deleteMedia', contactadd: 'addContact',
    groupadd: 'addGroup', contactremove: 'removeContact', groupremove: 'removeGroup', grouplist: 'listGroups',
    groupedit: 'editGroup', groupsearch: 'searchGroups', date: 'getServerDate', ping: 'ping'
  };

  const ARGUMENTS = {
    send: ['sender', 'receptor', 'message'], sendarray: ['sender', 'receptor', 'message'],
    status: ['messageid'], statuslocal: ['localid'], select: ['messageid'],
    selectoutbox: ['startdate', 'enddate', 'sender'], latestoutbox: ['pagesize', 'sender'],
    countoutbox: ['startdate', 'enddate', 'status'], cancel: ['messageid'], receive: ['linenumber', 'isread'],
    countinbox: ['startdate', 'enddate', 'linenumber', 'isread'], statusreceptor: ['receptor'],
    unreads: ['linenumber', 'isread'], inboxpaged: ['linenumber'], groupsendreport: ['startdate', 'enddate'],
    account: [], accountconfig: ['apilogs', 'dailyreport', 'debugmode', 'defaultsender', 'mincreditalarm', 'resendfailed'],
    lookup: ['receptor', 'token', 'template'], maketts: ['receptor', 'message'],
    clientlist: [], clientfetch: ['apikey'], clientfetchlocal: ['localid'], clientrenew: ['apikey', 'localid'],
    clientstatus: ['apikey', 'status'], clientcharge: ['apikey', 'credit', 'desc', 'vat', 'ip'],
    blockedadd: ['receptor', 'linenumber'], blockedremove: ['receptor', 'linenumber'],
    blockedlist: ['linenumber', 'pagenumber', 'startdate', 'blockreason'], blockedexists: ['linenumber', 'receptor'],
    templatelist: ['apikey', 'localid', 'page'],
    templateclone: ['sourcetemplateid', 'sourcetemplatename', 'newtemplatename', 'apikey', 'localid'],
    templateget: ['id', 'apikey', 'localid'], templatedelete: ['id', 'apikey', 'localid'],
    mediaupload: ['file'], medialist: ['page', 'size'], mediaget: ['id', 'filename', 'section'],
    mediadelete: ['id'], contactadd: ['groupid', 'number', 'title', 'birthdate', 'email', 'tags'],
    groupadd: ['name', 'tag'], contactremove: ['contactid', 'mobile', 'groupid'], groupremove: ['groupid'],
    grouplist: [], groupedit: ['groupid', 'groupname', 'status', 'tag'], groupsearch: ['tag'], date: [], ping: []
  };

  const PY_REQUESTS = {
    send: 'SendRequest', sendarray: 'SendArrayRequest', selectoutbox: 'SelectOutboxRequest',
    latestoutbox: 'LatestOutboxRequest', countoutbox: 'CountOutboxRequest', receive: 'ReceiveRequest',
    countinbox: 'CountInboxRequest', inboxpaged: 'InboxPagedRequest', groupsendreport: 'GroupSendReportRequest',
    statusreceptor: 'StatusByReceptorRequest', clientadd: 'AddClientRequest', clientupdate: 'SubClientDto',
    clientfetch: 'FetchClientRequest', clientfetchlocal: 'FetchClientByLocalIdRequest',
    clientstatus: 'SetClientStatusRequest', clientcharge: 'ChargeClientRequest', blockedadd: 'BlockedLineRequest',
    blockedremove: 'BlockedLineRequest', blockedlist: 'ListBlockedLinesRequest', blockedexists: 'BlockedLineRequest',
    templateclone: 'CloneTemplateRequest', templateadd: 'AddTemplateRequest', templateupdate: 'UpdateTemplateRequest',
    mediaupload: 'UploadMediaRequest', medialist: 'ListMediaRequest', contactadd: 'ContactRequest',
    contactremove: 'ContactRequest', groupadd: 'GroupRequest', groupremove: 'GroupRequest',
    grouplist: 'GroupRequest', groupedit: 'GroupUpdateRequest', groupsearch: 'GroupRequest'
  };

  const NODE_KEYS = {
    sender: 'sender', receptor: 'receptor', message: 'message', type: 'type', date: 'date', localid: 'localId',
    localmessageid: 'localMessageId', localmessageids: 'localMessageIds', messageid: 'messageIds',
    startdate: 'startDate', enddate: 'endDate', pagesize: 'pageSize', linenumber: 'lineNumber', isread: 'isRead',
    pagenumber: 'pageNumber', apilogs: 'apiLogs', dailyreport: 'dailyReport', debugmode: 'debugMode',
    defaultsender: 'defaultSender', mincreditalarm: 'minCreditAlarm', resendfailed: 'resendFailed',
    username: 'userName', fullname: 'fullName', planid: 'planId', mininumallowedcredit: 'minimumAllowedCredit',
    canuseparentlines: 'canUseParentLines', expiredate: 'expireDate', enablelink: 'enableLink', cancharge: 'canCharge',
    blockreason: 'blockReason', sourcetemplateid: 'sourceTemplateId', sourcetemplatename: 'sourceTemplateName',
    newtemplatename: 'newTemplateName', sourcetype: 'sourceType', sendmethod: 'sendMethod',
    fallbackmethod: 'fallBackMethod', primarylinenumber: 'primaryLineNumber', secondarylinenumber: 'secondaryLineNumber',
    switchttl: 'switchTtl', sourceurl: 'sourceUrl', sourcename: 'sourceName', textmessage: 'textMessage',
    voicemessage: 'voiceMessage', templateid: 'templateId', filename: 'fileName', groupid: 'groupId',
    contactid: 'contactId', groupname: 'groupName', parentid: 'parentId', birthdate: 'birthDate', desc: 'description'
  };

  const NUMERIC = /^(type|status|isread|startdate|enddate|date|pagesize|pagenumber|page|size|credit|vat|blockreason|section|groupid|contactid|parent|parentid|templateid|sourcetemplateid|switchttl|mincreditalarm|mininumallowedcredit)$/;
  const DATE_KEYS = new Set(['date', 'startdate', 'enddate', 'birthdate', 'expiredate']);
  const DTO_ENDPOINTS = new Set(['clientadd', 'clientupdate', 'templateadd', 'templateupdate']);

  const pascal = value => value.charAt(0).toUpperCase() + value.slice(1);
  const snake = value => value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  const quote = value => `"${String(value ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n')}"`;
  const phpQuote = value => `'${String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

  function examples(endpoint, current) {
    const result = { ...current };
    for (const field of endpoint.fields) {
      if (result[field.key]) continue;
      if (/^optional$/i.test(field.placeholder) || /unix timestamp/i.test(field.placeholder)) continue;
      result[field.key] = field.type === 'file' ? 'path/to/file' : /uuid/i.test(field.placeholder) ? '00000000-0000-0000-0000-000000000000' : field.placeholder;
    }
    return result;
  }

  function methodName(language, id) {
    const operation = OPERATIONS[id];
    if (language === 'dotnet') return pascal(operation);
    if (language === 'go') {
      return { accountInfo: 'Info', accountConfig: 'Config', verifyLookup: 'Lookup', callMakeTTS: 'MakeTTS' }[operation] || pascal(operation);
    }
    if (language === 'python') {
      const overrides = { accountInfo: 'get_account_info', accountConfig: 'get_account_config', verifyLookup: 'lookup', callMakeTTS: 'call_make_tts' };
      return overrides[operation] || snake(operation);
    }
    if (language === 'java') {
      const overrides = {
        status: 'getStatus', statusLocalMessageId: 'getStatusByLocalMessageId', select: 'selectMessages',
        latestOutbox: 'getLatestOutbox', cancel: 'cancelMessages', receive: 'receiveMessages',
        statusByReceptor: 'getStatusByReceptor', unreads: 'getUnreadMessages', inboxPaged: 'getInboxPage',
        groupSendReport: 'getGroupSendReport', accountInfo: 'getAccountInfo', accountConfig: 'configureAccount',
        callMakeTTS: 'makeTtsCall'
      };
      return overrides[operation] || operation;
    }
    if (language === 'node') {
      return { statusLocalMessageId: 'statusByLocalMessageId', callMakeTTS: 'makeTtsCall' }[operation] || operation;
    }
    return operation;
  }

  function listValue(value) {
    try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : [value]; } catch { return String(value).split(',').map(item => item.trim()).filter(Boolean); }
  }

  function format(language, key, value, endpointId) {
    if (value === undefined || value === null || value === '') return language === 'php' ? 'null' : language === 'python' ? 'None' : language === 'go' ? '""' : 'null';
    if (['canuseparentlines', 'enablelink', 'cancharge'].includes(key) && /^(true|false|1|0)$/i.test(String(value))) {
      const enabled = /^(true|1)$/i.test(String(value));
      if (language === 'python') return enabled ? 'True' : 'False';
      return enabled ? 'true' : 'false';
    }
    if (endpointId === 'sendarray' && ['sender', 'receptor', 'message'].includes(key)) {
      const items = listValue(value);
      if (language === 'dotnet') return `new List<string> { ${items.map(quote).join(', ')} }`;
      if (language === 'java') return `List.of(${items.map(quote).join(', ')})`;
      if (language === 'go') return `[]string{${items.map(quote).join(', ')}}`;
      if (language === 'php') return `[${items.map(phpQuote).join(', ')}]`;
      if (language === 'python') return `[${items.map(quote).join(', ')}]`;
    }
    if (DATE_KEYS.has(key) && /^\d+$/.test(String(value))) {
      if (language === 'dotnet') return `DateTimeOffset.FromUnixTimeSeconds(${value}).UtcDateTime`;
      if (language === 'java') return `new Date(${value}L * 1000)`;
      if (language === 'go') return `time.Unix(${value}, 0)`;
    }
    if (language === 'dotnet' && /^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(String(value))) return `Guid.Parse(${quote(value)})`;
    if (NUMERIC.test(key) && /^-?\d+(\.\d+)?$/.test(String(value))) {
      if (language === 'java' && (endpointId === 'blockedlist' && key === 'blockreason' || endpointId === 'groupedit' && key === 'status')) return `(byte) ${value}`;
      return String(value);
    }
    return language === 'php' ? phpQuote(value) : quote(value);
  }

  function orderedArgs(language, endpoint, data) {
    let keys = ARGUMENTS[endpoint.id] || endpoint.fields.filter(field => field.required).map(field => field.key);
    if (endpoint.id === 'maketts' && ['dotnet', 'java', 'python'].includes(language)) keys = ['message', 'receptor'];
    if (endpoint.id === 'lookup' && language === 'go') keys = ['receptor', 'template', 'token'];
    if (endpoint.id === 'lookup' && language === 'php') return [format(language, 'receptor', data.receptor, endpoint.id), format(language, 'token', data.token, endpoint.id), 'null', 'null', format(language, 'template', data.template, endpoint.id)];
    let args = keys.map(key => format(language, key, data[key], endpoint.id));
    if (language === 'go') {
      if (['send', 'sendarray', 'lookup', 'maketts'].includes(endpoint.id)) args.push('nil');
      if (endpoint.id === 'statusreceptor') args.push('nil', 'nil');
      if (endpoint.id === 'inboxpaged') args = [format(language, 'linenumber', data.linenumber, endpoint.id), 'nil', 'nil', 'nil', 'nil'];
      if (endpoint.id === 'templatelist') args = [format(language, 'apikey', data.apikey, endpoint.id), format(language, 'localid', data.localid, endpoint.id), 'nil'];
      if (endpoint.id === 'templateclone') args = ['nil', format(language, 'sourcetemplatename', data.sourcetemplatename, endpoint.id), format(language, 'newtemplatename', data.newtemplatename, endpoint.id), format(language, 'apikey', data.apikey, endpoint.id), format(language, 'localid', data.localid, endpoint.id)];
      if (endpoint.id === 'medialist') args = ['nil', 'nil'];
      if (endpoint.id === 'mediaget') args = ['nil', format(language, 'filename', data.filename, endpoint.id), 'nil'];
      if (endpoint.id === 'contactremove') args[2] = 'nil';
      if (endpoint.id === 'groupedit') args[2] = 'nil';
      if (endpoint.id === 'blockedlist') args[3] = 'nil';
      if (endpoint.id === 'clientcharge') args[3] = 'nil';
    }
    if (language === 'java') {
      if (endpoint.id === 'inboxpaged') args = [format(language, 'linenumber', data.linenumber, endpoint.id), 'null', 'null', 'null', 'null'];
      if (endpoint.id === 'templatelist') args = [format(language, 'apikey', data.apikey, endpoint.id), format(language, 'localid', data.localid, endpoint.id), 'null'];
      if (endpoint.id === 'templateclone') args = ['null', format(language, 'sourcetemplatename', data.sourcetemplatename, endpoint.id), format(language, 'newtemplatename', data.newtemplatename, endpoint.id), format(language, 'apikey', data.apikey, endpoint.id), format(language, 'localid', data.localid, endpoint.id)];
      if (endpoint.id === 'medialist') args = ['null', 'null'];
      if (endpoint.id === 'mediaget') args = [format(language, 'id', data.id, endpoint.id), format(language, 'filename', data.filename, endpoint.id)];
      if (endpoint.id === 'contactremove') args = [format(language, 'contactid', data.contactid, endpoint.id), format(language, 'mobile', data.mobile, endpoint.id), 'null'];
      if (endpoint.id === 'groupedit') args[2] = 'null';
      if (endpoint.id === 'blockedlist') args[3] = data.blockreason ? format(language, 'blockreason', data.blockreason, endpoint.id) : 'null';
    }
    return args;
  }

  function objectData(endpoint, data, language) {
    const entries = endpoint.fields.filter(field => data[field.key]).map(field => {
      let name = NODE_KEYS[field.key] || field.key;
      if (endpoint.id === 'sendarray') name = { sender: 'senders', receptor: 'receptors', message: 'messages', type: 'types' }[field.key] || name;
      if (endpoint.id === 'statuslocal' && field.key === 'localid') name = 'localIds';
      return [name, data[field.key], field.key];
    });
    return entries.map(([name, value, wire]) => {
      if (endpoint.id === 'sendarray' && ['sender', 'receptor', 'message', 'type'].includes(wire)) {
        const array = listValue(value).map(item => NUMERIC.test(wire) && /^\d+$/.test(item) ? item : quote(item)).join(', ');
        return `    ${name}: [${array}],`;
      }
      if (['messageIds', 'localIds'].includes(name)) return `    ${name}: [${quote(value)}],`;
      return `    ${name}: ${format(language, wire, value, endpoint.id)},`;
    }).join('\n');
  }

  function dotnetDto(endpoint, data) {
    const type = endpoint.id.startsWith('client') ? 'SubClientDto' : 'TemplateDto';
    const allowed = endpoint.id.startsWith('client') ? ['apikey', 'localid', 'credit', 'username', 'password', 'fullname', 'mobile', 'status', 'lines'] : ['name', 'textmessage', 'primarylinenumber', 'secondarylinenumber', 'sourceurl', 'sourcename', 'voicemessage', 'localid', 'apikey'];
    const names = { apikey: 'ApiKey', localid: 'LocalId', credit: 'Credit', username: 'UserName', password: 'Password', fullname: 'FullName', mobile: 'Mobile', status: 'Status', lines: 'Lines', name: 'Name', textmessage: 'TextMessage', primarylinenumber: 'PrimaryLineNumber', secondarylinenumber: 'SecondaryLineNumber', sourceurl: 'SourceUrl', sourcename: 'SourceName', voicemessage: 'VoiceMessage' };
    const props = allowed.filter(key => data[key]).map(key => `    ${names[key]} = ${format('dotnet', key, data[key], endpoint.id)},`).join('\n');
    return `var request = new ${type}\n{\n${props}\n};`;
  }

  function generateDotnet(endpoint, data) {
    const method = methodName('dotnet', endpoint.id);
    let setup = '';
    let args = orderedArgs('dotnet', endpoint, data);
    if (endpoint.id === 'mediaget') args = args.slice(0, 2);
    if (DTO_ENDPOINTS.has(endpoint.id)) {
      setup = `${dotnetDto(endpoint, data)}\n`;
      args = endpoint.id === 'templateupdate' ? [format('dotnet', 'templateid', data.templateid, endpoint.id), 'request'] : ['request'];
    }
    return `using Kavenegar;\nusing Kavenegar.Models;\n\nvar api = new KavenegarApi(Environment.GetEnvironmentVariable("KAVENEGAR_API_KEY")!);\n${setup}\ntry\n{\n    var result = api.${method}(${args.join(', ')});\n    Console.WriteLine(result);\n}\ncatch (Kavenegar.Exceptions.ApiException ex)\n{\n    Console.Error.WriteLine($"API error [{ex.Code}]: {ex.Message}");\n}`;
  }

  function generateGo(endpoint, data) {
    const operation = methodName('go', endpoint.id);
    const service = endpoint.group === 'SMS' ? 'Message' : endpoint.id.startsWith('account') ? 'Account' : endpoint.id === 'lookup' || endpoint.group === 'Templates' ? 'Verify' : endpoint.id === 'maketts' ? 'Call' : endpoint.group === 'Subclients' ? 'SubClient' : endpoint.group === 'Blocked lines' ? 'BlockedLine' : endpoint.group === 'Media' ? 'Media' : endpoint.group === 'Contacts & Groups' ? 'Contact' : 'Utils';
    let setup = '';
    let args = orderedArgs('go', endpoint, data);
    if (endpoint.id === 'accountconfig') {
      setup = `\trequest := &kavenegar.AccountConfigParam{\n\t\tApilogs: kavenegar.Type_AccountAPILog_Enabled,\n\t\tDailyreport: kavenegar.Type_AccountDailyReport_Enabled,\n\t\tDebugmode: kavenegar.Type_AccountDebugMode_Disabled,\n\t\tDefaultsender: ${quote(data.defaultsender)},\n\t\tMincreditalarm: ${quote(data.mincreditalarm)},\n\t\tResendfailed: kavenegar.Type_AccountResendFailed_Enabled,\n\t}\n`;
      args = ['request'];
    }
    if (endpoint.id === 'clientadd' || endpoint.id === 'clientupdate') {
      setup = `\tcredit := ${data.credit || '100000'}.0\n\trequest := &kavenegar.SubClientDto{Credit: &credit, UserName: ${quote(data.username)}, Password: ${quote(data.password)}, FullName: ${quote(data.fullname)}, Mobile: ${quote(data.mobile)}}\n`;
      args = ['request'];
    }
    if (endpoint.id === 'templateadd' || endpoint.id === 'templateupdate') {
      setup = `\trequest := &kavenegar.TemplateDto{Name: ${quote(data.name)}, TextMessage: ${quote(data.textmessage)}, PrimaryLineNumber: ${quote(data.primarylinenumber)}}\n`;
      args = endpoint.id === 'templateupdate' ? [format('go', 'templateid', data.templateid, endpoint.id), 'request'] : ['request'];
    }
    const needsTime = (ARGUMENTS[endpoint.id] || []).some(key => DATE_KEYS.has(key));
    return `package main\n\nimport (\n    "fmt"\n    "os"${needsTime ? '\n    "time"' : ''}\n    "github.com/kavenegar/kavenegar-go"\n)\n\nfunc main() {\n    api := kavenegar.New(os.Getenv("KAVENEGAR_API_KEY"))\n${setup}    result, err := api.${service}.${operation}(${args.join(', ')})\n    if err != nil { panic(err) }\n    fmt.Printf("%+v\\n", result)\n}`;
  }

  function javaBuilder(endpoint, data) {
    if (endpoint.id.startsWith('client')) {
      return `var request = SubClientRequest.builder()\n    .userName(${quote(data.username)})\n    .password(${quote(data.password)})\n    .fullName(${quote(data.fullname)})\n    .mobile(${quote(data.mobile)})\n    .credit(${data.credit || '100000'}L)\n    .build();`;
    }
    return `var request = TemplateRequest.builder()\n    .templateName(${quote(data.name)})\n    .textMessage(${quote(data.textmessage)})\n    .primaryLineNumber(${quote(data.primarylinenumber)})\n    .build();`;
  }

  function generateJava(endpoint, data) {
    const method = methodName('java', endpoint.id);
    let setup = '';
    let args = orderedArgs('java', endpoint, data);
    if (DTO_ENDPOINTS.has(endpoint.id)) {
      setup = `${javaBuilder(endpoint, data)}\n`;
      args = endpoint.id === 'templateupdate' ? [format('java', 'templateid', data.templateid, endpoint.id), 'request'] : ['request'];
    }
    return `import com.kavenegar.sdk.KavenegarClient;\nimport com.kavenegar.sdk.models.*;\nimport java.util.*;\n\nvar api = new KavenegarClient(System.getenv("KAVENEGAR_API_KEY"));\n${setup}\ntry {\n    var result = api.${method}(${args.join(', ')});\n    System.out.println(result);\n} catch (RuntimeException ex) {\n    System.err.println("Request failed: " + ex.getMessage());\n}`;
  }

  function generateNode(endpoint, data) {
    const method = methodName('node', endpoint.id);
    const params = objectData(endpoint, data, 'node');
    return `import { KavenegarClient } from 'kavenegar-node';\n\nconst client = new KavenegarClient({\n  apiKey: process.env.KAVENEGAR_API_KEY,\n});\n\ntry {\n  const result = await client.${method}({\n${params}\n  });\n  console.log(result);\n} catch (error) {\n  console.error(error);\n}`;
  }

  function generatePhp(endpoint, data) {
    const method = methodName('php', endpoint.id);
    let args = orderedArgs('php', endpoint, data);
    if (DTO_ENDPOINTS.has(endpoint.id)) {
      const fields = endpoint.fields.filter(field => data[field.key]).map(field => `    ${phpQuote(field.key)} => ${format('php', field.key, data[field.key], endpoint.id)},`).join('\n');
      const array = `[\n${fields}\n]`;
      args = endpoint.id === 'templateupdate' ? [format('php', 'templateid', data.templateid, endpoint.id), array] : [array];
    }
    return `<?php\nrequire __DIR__ . '/vendor/autoload.php';\n\nuse Kavenegar\\KavenegarApi;\nuse Kavenegar\\Exceptions\\ApiException;\n\n$api = new KavenegarApi(getenv('KAVENEGAR_API_KEY'));\n\ntry {\n    $result = $api->${method}(${args.join(', ')});\n    print_r($result);\n} catch (ApiException $e) {\n    echo $e->getMessage();\n}`;
  }

  function pythonFieldName(type, key) {
    const shared = {
      linenumber: 'line_number', pagenumber: 'page_number', startdate: 'start_date', enddate: 'end_date',
      blockreason: 'block_reason', groupid: 'group_id', contactid: 'contact_id', groupname: 'group_name'
    };
    const byType = {
      ReceiveRequest: { linenumber: 'line' },
      AddClientRequest: { localid: 'local_id', planid: 'plan_id', mininumallowedcredit: 'minimum_allowed_credit', canuseparentlines: 'can_use_parent_lines', expiredate: 'expire_date', enablelink: 'enable_link' },
      SubClientDto: { apikey: 'ApiKey', ip: 'Ip', localid: 'LocalId', credit: 'Credit', username: 'UserName', password: 'Password', fullname: 'FullName', planid: 'PlanId', mobile: 'Mobile', status: 'Status', mininumallowedcredit: 'MininumAllowedCredit', lines: 'Lines', canuseparentlines: 'CanUseParentLines', expiredate: 'ExpireDate', enablelink: 'EnableLink', cancharge: 'CanCharge' },
      AddTemplateRequest: { primarylinenumber: 'primaryline_number', secondarylinenumber: 'secondaryline_number', localid: 'local_id', apikey: 'api_key' },
      UpdateTemplateRequest: { templateid: 'template_id', primarylinenumber: 'primaryline_number', secondarylinenumber: 'secondaryline_number' }
    };
    return byType[type]?.[key] || shared[key] || key;
  }

  function pythonRequest(endpoint, data, type) {
    const includeAll = ['clientadd', 'clientupdate', 'templateclone', 'contactremove'].includes(endpoint.id);
    const keys = endpoint.fields.filter(field => data[field.key] && (includeAll || field.required || ['credit', 'username', 'password', 'fullname', 'mobile', 'name', 'textmessage', 'primarylinenumber'].includes(field.key)));
    const kwargs = keys.map(field => {
      let value = format('python', field.key, data[field.key], endpoint.id);
      if (type === 'SelectOutboxRequest' && ['startdate', 'enddate'].includes(field.key)) value = `datetime.fromtimestamp(${data[field.key]})`;
      return `        ${pythonFieldName(type, field.key)}=${value},`;
    }).join('\n');
    return `${type}(\n${kwargs}\n    )`;
  }

  function generatePython(endpoint, data) {
    const method = methodName('python', endpoint.id);
    const requestType = PY_REQUESTS[endpoint.id];
    let imports = '';
    let args = orderedArgs('python', endpoint, data);
    if (requestType) {
      imports = `, ${requestType}`;
      let request = pythonRequest(endpoint, data, requestType);
      if (endpoint.id === 'mediaupload') {
        request = `UploadMediaRequest(\n        name=Path(${quote(data.file)}).name,\n        file_content=Path(${quote(data.file)}).read_bytes(),\n    )`;
      }
      args = endpoint.id === 'templateupdate' ? [request] : [request];
    }
    const helpers = `${endpoint.id === 'mediaupload' ? 'from pathlib import Path\n' : ''}${endpoint.id === 'selectoutbox' ? 'from datetime import datetime\n' : ''}`;
    return `import os\n${helpers}from kavenegar import ClientConfig, KavenegarAPI${imports}\n\nconfig = ClientConfig(apikey=os.environ["KAVENEGAR_API_KEY"])\n\nwith KavenegarAPI(config) as api:\n    result = api.${method}(${args.join(', ')})\n    print(result)`;
  }

  function generate(language, endpoint, currentValues) {
    if (!OPERATIONS[endpoint.id]) return `// This endpoint is not exposed by the ${language} SDK.`;
    const data = examples(endpoint, currentValues);
    if (language === 'dotnet') return generateDotnet(endpoint, data);
    if (language === 'go') return generateGo(endpoint, data);
    if (language === 'java') return generateJava(endpoint, data);
    if (language === 'node') return generateNode(endpoint, data);
    if (language === 'php') return generatePhp(endpoint, data);
    return generatePython(endpoint, data);
  }

  global.SDKExamples = { generate, operations: OPERATIONS };
})(globalThis);
