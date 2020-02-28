# ossutil-action

github action 下 ossutil 命令行工具 

# Usage

See [action.yml](action.yml)

用例:

```yaml
steps:
  - uses: actions/checkout@master
  - uses: waltcow/ossutil-actionl@master
    with:
      endpoint: "oss.aliyuncs.com"
      access-key-id: "your_key_id"
      access-key-secret: "your_key_secret"
      oss-args: "cp -rf test.txt oss://bucket/path" 
```

参数

- **endpoint**：填写 Bucket 所在地域的域名信息，可参考访问域名和数据中心。
- **access-key-id**：查看方式请参考创建 AccessKey。
- **access-key-secret**：查看方式请参考创建 AccessKey。
- **oss-args**: ossutils 执行的其他参数

[详细用法参考，阿里云 ossutil 帮助文档](https://help.aliyun.com/document_detail/50452.html)

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
