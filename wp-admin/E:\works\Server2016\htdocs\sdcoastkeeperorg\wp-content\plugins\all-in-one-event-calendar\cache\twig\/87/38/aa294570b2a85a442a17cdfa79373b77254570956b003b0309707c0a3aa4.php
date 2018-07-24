<?php

/* select2_input.twig */
class __TwigTemplate_8738aa294570b2a85a442a17cdfa79373b77254570956b003b0309707c0a3aa4 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        $context["__internal_31e4e4ed46e056529190e1e9ea90105213ed28929a66ece00ef2d002a248d191"] = $this->env->loadTemplate("form-elements/input.twig");
        // line 2
        echo $context["__internal_31e4e4ed46e056529190e1e9ea90105213ed28929a66ece00ef2d002a248d191"]->getinput((isset($context["id"]) ? $context["id"] : null), (isset($context["name"]) ? $context["name"] : null), "", "text", (isset($context["select2_args"]) ? $context["select2_args"] : null));
    }

    public function getTemplateName()
    {
        return "select2_input.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  168 => 36,  162 => 35,  156 => 33,  145 => 31,  141 => 30,  137 => 29,  134 => 28,  130 => 26,  121 => 24,  110 => 22,  106 => 21,  102 => 20,  99 => 19,  95 => 18,  90 => 17,  87 => 16,  83 => 15,  80 => 14,  74 => 13,  66 => 11,  63 => 10,  59 => 9,  55 => 8,  51 => 7,  47 => 6,  44 => 5,  41 => 4,  38 => 3,  21 => 2,  35 => 2,  33 => 6,  30 => 5,  24 => 3,  22 => 2,  19 => 1,);
    }
}
