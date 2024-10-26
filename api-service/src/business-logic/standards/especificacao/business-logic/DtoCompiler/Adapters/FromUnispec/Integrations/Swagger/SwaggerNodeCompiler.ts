import { IDtoCompilerContext } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/typings";
import { INode, INodeTypeArray, INodeTypeObjectEntity, NodeHandler } from "@/business-logic/standards/especificacao/infrastructure";
import { SchemaObjectMetadata } from "@nestjs/swagger/dist/interfaces/schema-object-metadata.interface";

export type ISwaggerType = SchemaObjectMetadata & {
  nullable?: boolean;
  $ref?: string;
  anyOf?: any;
  mimeTypes?: any;
};

export class SwaggerNodeCompiler extends NodeHandler<ISwaggerType, IDtoCompilerContext> {
  ComposeNode(node: INode, context: IDtoCompilerContext) {
    const composedResult = context.nodesStore.Compose(node);
    return composedResult;
  }

  HandleTypeObjectEntity(node: INodeTypeObjectEntity, context: IDtoCompilerContext) {
    const composed = this.ComposeNode(node, context);

    const dto = context.dtoCompiler.CompileNode(node);

    return {
      ...composed,

      type: dto,

      properties: undefined,
      required: undefined,
      additionalProperties: undefined,
    } satisfies ISwaggerType;
  }

  HandleTypeArray(node: INodeTypeArray, context: IDtoCompilerContext): ISwaggerType {
    return {
      isArray: true,
      ...this.Handle(node.items, context),
    } satisfies ISwaggerType;
  }

  HandleDefault(node: any, context: IDtoCompilerContext): ISwaggerType {
    const decomposed = this.ComposeNode(node, context);
    return { ...decomposed };
  }

  Handle(node: INode, context: IDtoCompilerContext): ISwaggerType {
    const handled = super.Handle(node, context);

    if (handled) {
      return handled;
    }

    throw new TypeError("could not handle node");
  }
}
